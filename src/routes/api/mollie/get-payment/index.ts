import type { RequestHandler } from "@builder.io/qwik-city";
import { createMollieClient, type MollieClient } from '@mollie/api-client';

export const onPost: RequestHandler = async (requestEvent) => {
    try {
        const mollieApiKey = requestEvent.env.get("MOLLIE_API_KEY");
        if (!mollieApiKey) {
            requestEvent.json(500, { error: "Server configuration error" });
            return;
        }

        const body = await requestEvent.parseBody() as { paymentId: string };
        
        if (!body.paymentId) {
            requestEvent.json(400, { error: "Payment ID is required" });
            return;
        }

        const mollieClient: MollieClient = createMollieClient({ apiKey: mollieApiKey });
        const payment = await mollieClient.payments.get(body.paymentId);

        // Return serializable payment data
        requestEvent.json(200, {
            id: payment.id,
            status: payment.status,
            amount: payment.amount,
            description: payment.description,
            metadata: payment.metadata,
            createdAt: payment.createdAt,
            paidAt: payment.paidAt,
        });

    } catch (error) {
        console.error("Mollie payment get error:", error);
        requestEvent.json(500, { error: "Failed to get payment" });
    }
};