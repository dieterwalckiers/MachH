import type { RequestHandler } from "@builder.io/qwik-city";
import { createMollieClient, type MollieClient } from '@mollie/api-client';

interface CreatePaymentRequest {
    amount: number;
    description: string;
    redirectUrl: string;
    webhookUrl: string;
    metadata: {
        attendeeId: string;
        eventSlug: string;
        firstName: string;
        lastName: string;
        email: string;
    };
}

export const onPost: RequestHandler = async (requestEvent) => {
    try {
        const mollieApiKey = requestEvent.env.get("MOLLIE_API_KEY");
        if (!mollieApiKey) {
            requestEvent.json(500, { error: "Server configuration error" });
            return;
        }

        const body = await requestEvent.parseBody() as CreatePaymentRequest;
        
        const mollieClient: MollieClient = createMollieClient({ apiKey: mollieApiKey });

        const paymentParams: any = {
            amount: {
                currency: 'EUR',
                value: body.amount.toFixed(2)
            },
            description: body.description,
            redirectUrl: body.redirectUrl,
            webhookUrl: body.webhookUrl,
            metadata: body.metadata
        };
        
        const payment = await mollieClient.payments.create(paymentParams);

        // Return serializable payment data
        requestEvent.json(200, {
            id: payment.id,
            status: payment.status,
            amount: payment.amount,
            description: payment.description,
            metadata: payment.metadata,
            checkoutUrl: payment.getCheckoutUrl(),
            createdAt: payment.createdAt,
        });

    } catch (error) {
        console.error("Mollie payment creation error:", error);
        requestEvent.json(500, { error: "Failed to create payment" });
    }
};