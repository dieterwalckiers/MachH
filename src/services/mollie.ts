export interface CreatePaymentParams {
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

export interface PaymentData {
    id: string;
    status: string;
    amount: any;
    description: string;
    metadata: any;
    createdAt: string;
    paidAt?: string;
    checkoutUrl?: string;
}

export async function createMolliePayment(params: CreatePaymentParams, baseUrl: string): Promise<PaymentData> {
    const response = await fetch(`${baseUrl}/api/mollie/create-payment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    });

    if (!response.ok) {
        throw new Error(`Failed to create payment: ${response.statusText}`);
    }

    return await response.json();
}

export async function getMolliePayment(paymentId: string, baseUrl: string): Promise<PaymentData> {
    const response = await fetch(`${baseUrl}/api/mollie/get-payment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentId }),
    });

    if (!response.ok) {
        throw new Error(`Failed to get payment: ${response.statusText}`);
    }

    return await response.json();
}

export function verifyWebhookRequest(paymentId: string | undefined): boolean {
    return !!(paymentId && paymentId.startsWith('tr_'));
}