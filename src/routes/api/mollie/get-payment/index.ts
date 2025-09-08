import type { RequestHandler } from "@builder.io/qwik-city";
import { createMollieClient } from "@mollie/api-client";

export interface GetPaymentRequest {
    paymentId: string;
}

export const onPost: RequestHandler = async ({ request, json, env }) => {
    try {
        const mollieApiKey = env.get("MOLLIE_API_KEY");
        if (!mollieApiKey) {
            json(500, { error: "Server configuration error" });
            return;
        }

        const body = await request.json() as GetPaymentRequest;
        
        // Validate required fields
        if (!body || !body.paymentId) {
            console.error("Invalid request body:", body);
            json(400, { error: "Missing payment ID" });
            return;
        }
        
        const mollieClient = createMollieClient({ apiKey: mollieApiKey });
        const payment = await mollieClient.payments.get(body.paymentId);

        // Return serializable payment data
        json(200, {
            id: payment.id,
            status: payment.status,
            amount: payment.amount,
            description: payment.description,
            metadata: payment.metadata,
            createdAt: payment.createdAt,
            paidAt: payment.paidAt || undefined,
        });

    } catch (error) {
        console.error("Mollie payment retrieval error:", error);
        json(500, { 
            error: "Failed to get payment", 
            details: error instanceof Error ? error.message : String(error) 
        });
    }
};