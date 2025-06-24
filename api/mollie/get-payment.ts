/* eslint-disable @typescript-eslint/no-var-requires */
// Note: CommonJS style is required for this file to work with Vercel edge function runtime
const { createMollieClient: createMollieClientFn } = require('@mollie/api-client');

module.exports.config = {
  runtime: 'nodejs18.x', // Force Node.js runtime instead of Edge
};

module.exports = async function handler(req: any, res: any) {
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

        const mollieClient = createMollieClientFn({ apiKey: mollieApiKey });
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