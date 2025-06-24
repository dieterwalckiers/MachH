import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createMollieClient, type MollieClient } from '@mollie/api-client';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const mollieApiKey = process.env.MOLLIE_API_KEY;
        if (!mollieApiKey) {
            return res.status(500).json({ error: "Server configuration error" });
        }

        const body = req.body as { paymentId: string };
        
        if (!body.paymentId) {
            return res.status(400).json({ error: "Payment ID is required" });
        }

        const mollieClient: MollieClient = createMollieClient({ apiKey: mollieApiKey });
        const payment = await mollieClient.payments.get(body.paymentId);

        // Return serializable payment data
        return res.status(200).json({
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
        return res.status(500).json({ error: "Failed to get payment" });
    }
}