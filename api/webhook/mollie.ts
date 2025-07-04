/* eslint-disable @typescript-eslint/no-var-requires */
// Note: CommonJS style is required for this file to work with Vercel edge function runtime
const { createClient } = require('@supabase/supabase-js');

module.exports.config = {
  runtime: 'nodejs18.x', // Force Node.js runtime instead of Edge
};

module.exports = async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Get payment ID from request
        const paymentId = req.body?.id as string;
        
        // Basic verification
        if (!paymentId || !paymentId.startsWith('tr_')) {
            return res.status(400).json({ error: 'Invalid payment ID' });
        }
        
        // Get Mollie API key
        const mollieApiKey = process.env.MOLLIE_API_KEY;
        if (!mollieApiKey) {
            return res.status(500).json({ error: 'Server configuration error' });
        }
        
        // Get payment details from Mollie directly
        const publicAppUrl = process.env.PUBLIC_APP_URL || `https://${req.headers.host}`;
        const mollieResponse = await fetch(`${publicAppUrl}/api/mollie/get-payment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ paymentId }),
        });

        if (!mollieResponse.ok) {
            throw new Error(`Failed to get payment: ${mollieResponse.status} ${mollieResponse.statusText}`);
        }

        const payment = await mollieResponse.json();
        
        if (!payment.metadata?.attendeeId) {
            return res.status(400).json({ error: 'Invalid payment metadata' });
        }
        
        // Initialize Supabase client
        const supabaseClient = createClient(
            process.env.SUPABASE_URL!,
            process.env.SUPABASE_ANON_KEY!
        );
        
        // Get attendee record
        const { data: attendee, error: attendeeError } = await supabaseClient
            .from('attendees')
            .select('*')
            .eq('id', payment.metadata.attendeeId)
            .single();
            
        if (attendeeError || !attendee) {
            return res.status(404).json({ error: 'Attendee not found' });
        }
        
        // Check if already processed
        if (attendee.payment_status === 'confirmed' && payment.status === 'paid') {
            return res.status(200).json({ message: 'Already processed' });
        }
        
        // Update attendee based on payment status
        const updateData: any = {
            payment_id: payment.id,
        };
        
        if (payment.status === 'paid') {
            updateData.payment_status = 'confirmed';
            updateData.paid_at = new Date().toISOString();
            
            // Update attendee
            const { error: updateError } = await supabaseClient
                .from('attendees')
                .update(updateData)
                .eq('id', attendee.id);
                
            if (updateError) {
                return res.status(500).json({ error: 'Failed to update payment status' });
            }
            
            // Fetch event details for confirmation email
            const { createClient: createSanityClient } = require('@sanity/client');
            const sanityClient = createSanityClient({
                projectId: 'x6sfouap',
                dataset: 'production',
                useCdn: true,
                apiVersion: '2023-10-14',
            });
            
            const [event] = await sanityClient.fetch(
                `*[_type == "event" && slug.current == "${attendee.event_slug}"]{confirmationMailSubject, confirmationMailBody}`
            );
            
            if (event?.confirmationMailSubject && event?.confirmationMailBody) {
                // Send confirmation emails directly
                const { Resend } = require('resend');
                const resend = new Resend(process.env.RESEND_API_KEY);
                
                // Send both internal and subscriber emails
                await Promise.all([
                    // Internal email
                    resend.emails.send({
                        from: "Mach-H <inschrijvingen@transactional.mach-h.be>",
                        replyTo: "inschrijvingen@mach-h.be",
                        to: "inschrijvingen@mach-h.be",
                        subject: `Nieuwe inschrijving voor ${attendee.event_slug}`,
                        html: `<div><p>Nieuwe inschrijving voor ${attendee.event_slug} van ${attendee.first_name} ${attendee.last_name} (${attendee.email})!</p><p>Bekijk alle inschrijvingen op supabase.com</p></div>`,
                        text: `Nieuwe inschrijving voor ${attendee.event_slug} van ${attendee.first_name} ${attendee.last_name} (${attendee.email})! Bekijk alle inschrijvingen op supabase.com`,
                    }),
                    // Subscriber email
                    resend.emails.send({
                        from: "Mach-H <inschrijvingen@transactional.mach-h.be>",
                        replyTo: "inschrijvingen@mach-h.be",
                        to: attendee.email,
                        subject: event.confirmationMailSubject,
                        html: event.confirmationMailBody.replace(/(\r\n|\n|\r)/g, "<br>"),
                        text: event.confirmationMailBody,
                    })
                ]);
            }
        } else if (payment.status === 'failed' || payment.status === 'canceled' || payment.status === 'expired') {
            updateData.payment_status = 'failed';
            
            // Update attendee
            await supabaseClient
                .from('attendees')
                .update(updateData)
                .eq('id', attendee.id);
        }
        
        res.status(200).json({ message: 'Webhook processed successfully' });
        
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}