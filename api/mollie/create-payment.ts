import type { VercelRequest, VercelResponse } from '@vercel/node';
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const mollieApiKey = process.env.MOLLIE_API_KEY;
        if (!mollieApiKey) {
            return res.status(500).json({ error: "Server configuration error" });
        }

        const body = req.body as CreatePaymentRequest;
        
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
        return res.status(200).json({
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
        return res.status(500).json({ error: "Failed to create payment" });
    }
}