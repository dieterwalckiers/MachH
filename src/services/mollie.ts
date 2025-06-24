import { createMollieClient, type MollieClient, type Payment } from '@mollie/api-client';
import { server$ } from "@builder.io/qwik-city";

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

export const createMolliePayment = server$(
    async function (params: CreatePaymentParams, mollieApiKey: string): Promise<Payment> {
        const mollieClient: MollieClient = createMollieClient({ apiKey: mollieApiKey });

        const paymentParams: any = {
            amount: {
                currency: 'EUR',
                value: params.amount.toFixed(2)
            },
            description: params.description,
            redirectUrl: params.redirectUrl,
            webhookUrl: params.webhookUrl,
            metadata: params.metadata
        };
        
        const payment = await mollieClient.payments.create(paymentParams);

        return payment;
    }
);

export const getMolliePayment = server$(
    async function (paymentId: string, mollieApiKey: string): Promise<Payment> {
        const mollieClient: MollieClient = createMollieClient({ apiKey: mollieApiKey });
        const payment = await mollieClient.payments.get(paymentId);
        return payment;
    }
);

export const verifyWebhookRequest = server$(
    async function (paymentId: string | undefined): Promise<boolean> {
        return !!(paymentId && paymentId.startsWith('tr_'));
    }
);