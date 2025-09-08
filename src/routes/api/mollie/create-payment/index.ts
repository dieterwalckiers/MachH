import type { RequestHandler } from "@builder.io/qwik-city";
import { createMollieClient } from "@mollie/api-client";

export interface CreatePaymentRequest {
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

export const onPost: RequestHandler = async ({ request, json, env }) => {
    try {
        const mollieApiKey = env.get("MOLLIE_API_KEY");
        if (!mollieApiKey) {
            json(500, { error: "Server configuration error" });
            return;
        }

        const body = await request.json() as CreatePaymentRequest;
        
        // Validate required fields
        if (!body || typeof body.amount !== "number" || !body.description || !body.redirectUrl || !body.webhookUrl) {
            console.error("Invalid request body:", body);
            json(400, { error: "Missing required fields" });
            return;
        }
        
        console.log("Creating Mollie client with API key:", mollieApiKey ? "Present" : "Missing");
        const mollieClient = createMollieClient({ apiKey: mollieApiKey });

        const paymentParams = {
            amount: {
                currency: "EUR",
                value: body.amount.toFixed(2)
            },
            description: body.description,
            redirectUrl: body.redirectUrl,
            webhookUrl: body.webhookUrl,
            metadata: body.metadata
        };
        
        const payment = await mollieClient.payments.create(paymentParams);

        // Return serializable payment data
        json(200, {
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
        console.error("Request body:", await request.text().catch(() => "Unable to read body"));
        json(500, { 
            error: "Failed to create payment", 
            details: error instanceof Error ? error.message : String(error) 
        });
    }
};