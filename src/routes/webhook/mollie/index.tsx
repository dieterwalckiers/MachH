import type { RequestHandler } from "@builder.io/qwik-city";
import { createServerClient } from "supabase-auth-helpers-qwik";
import { sendConfirmationEmails } from "~/util/mail";
import sanityClient from "~/cms/sanityClient";

export const onPost: RequestHandler = async (requestEvent) => {
    try {
        // Skip CSRF for webhooks
        requestEvent.sharedMap.set("skipCSRF", true);
        // Get payment ID from request
        const body = await requestEvent.parseBody() as any;
        const paymentId = body?.id as string;
        
        // Basic verification
        const { verifyWebhookRequest, getMolliePayment } = await import("~/services/mollie");
        if (!verifyWebhookRequest(paymentId)) {
            requestEvent.json(400, { error: "Invalid payment ID" });
            return;
        }
        
        // Get Mollie API key
        const mollieApiKey = requestEvent.env.get("MOLLIE_API_KEY");
        if (!mollieApiKey) {
            requestEvent.json(500, { error: "Server configuration error" });
            return;
        }
        
        // Get payment details from Mollie
        const publicAppUrl = requestEvent.env.get("PUBLIC_APP_URL") || requestEvent.url.origin;
        const payment = await getMolliePayment(paymentId, publicAppUrl);
        
        if (!payment.metadata?.attendeeId) {
            requestEvent.json(400, { error: "Invalid payment metadata" });
            return;
        }
        
        // Initialize Supabase client
        const supabaseClient = createServerClient(
            requestEvent.env.get("SUPABASE_URL")!,
            requestEvent.env.get("SUPABASE_ANON_KEY")!,
            requestEvent
        );
        
        // Get attendee record
        const { data: attendee, error: attendeeError } = await supabaseClient
            .from("attendees")
            .select("*")
            .eq("id", payment.metadata.attendeeId)
            .single();
            
        if (attendeeError || !attendee) {
            requestEvent.json(404, { error: "Attendee not found" });
            return;
        }
        
        // Check if already processed
        if (attendee.payment_status === "confirmed" && payment.status === "paid") {
            requestEvent.json(200, { message: "Already processed" });
            return;
        }
        
        // Update attendee based on payment status
        const updateData: any = {
            payment_id: payment.id,
        };
        
        if (payment.status === "paid") {
            updateData.payment_status = "confirmed";
            updateData.paid_at = new Date().toISOString();
            
            // Update attendee
            const { error: updateError } = await supabaseClient
                .from("attendees")
                .update(updateData)
                .eq("id", attendee.id);
                
            if (updateError) {
                requestEvent.json(500, { error: "Failed to update payment status" });
                return;
            }
            
            // Fetch event details for confirmation email
            const [event] = await sanityClient.fetch(
                `*[_type == "event" && slug.current == "${attendee.event_slug}"]{confirmationMailSubject, confirmationMailBody}`
            );
            
            if (event?.confirmationMailSubject && event?.confirmationMailBody) {
                // Send confirmation emails
                await sendConfirmationEmails(
                    attendee,
                    {
                        subject: event.confirmationMailSubject,
                        body: event.confirmationMailBody,
                    },
                    requestEvent.env.get("RESEND_API_KEY")!
                );
            }
        } else if (payment.status === "failed" || payment.status === "canceled" || payment.status === "expired") {
            updateData.payment_status = "failed";
            
            // Update attendee
            await supabaseClient
                .from("attendees")
                .update(updateData)
                .eq("id", attendee.id);
        }
        
        requestEvent.json(200, { message: "Webhook processed successfully" });
        
    } catch (error) {
        console.error("Webhook error:", error);
        requestEvent.json(500, { error: "Internal server error" });
    }
};