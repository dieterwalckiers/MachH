/* eslint-disable @typescript-eslint/no-unused-vars */
import { server$ } from "@builder.io/qwik-city";

export const sendConfirmationEmails = server$(
    async function (
        data: {
            id: string;
            event_slug: string;
            first_name: string;
            last_name: string;
            email: string;
        },
        confirmationMailInfo: {
            subject: string;
            body: string;
        },
    ) {
        await Promise.all([
            sendInternalEmail(data),
            sendSubscriberEmail(data, confirmationMailInfo),
        ]);
    }
);

const sendInternalEmail = server$(
    async function (
        data: {
            id: string;
            event_slug: string;
            first_name: string;
            last_name: string;
            email: string;
        },
    ) {

        // const resend = new Resend("re_XYjHE8Gv_4Lp6Gvtk85fzZD3z8TGA77sV");
        // const response = await resend.emails.send({
        //     from: "Mach-H <inschrijvingen@transactional.mach-h.be>",
        //     replyTo: "inschrijvingen@mach-h.be",
        //     to: "inschrijvingen@mach-h.be",
        //     subject: `Nieuwe inschrijving voor ${data.event_slug}`,
        //     html: `<div><p>Nieuwe inschrijving voor ${data.event_slug} van ${data.first_name} ${data.last_name} (${data.email})!</p><p>Bekijk alle inschrijvingen op supabase.com</p></div>`,
        //     text: `Nieuwe inschrijving voor ${data.event_slug} van ${data.first_name} ${data.last_name} (${data.email})! Bekijk alle inschrijvingen op supabase.com`,
        // });
        // console.log("response.data?.id", response.data?.id);
    }
);

const sendSubscriberEmail = server$(
    async function (
        data: {
            id: string;
            event_slug: string;
            first_name: string;
            last_name: string;
            email: string;
        },
        confirmationMailInfo: {
            subject: string;
            body: string;
        }
    ) {
        // const resend = new Resend("re_XYjHE8Gv_4Lp6Gvtk85fzZD3z8TGA77sV");
        // await resend.emails.send({
        //     from: "Mach-H <inschrijvingen@transactional.mach-h.be>",
        //     replyTo: "inschrijvingen@mach-h.be",
        //     to: data.email,
        //     subject: confirmationMailInfo.subject,
        //     html: confirmationMailInfo.body.replace(/(\r\n|\n|\r)/g, "<br>"),
        //     text: confirmationMailInfo.body,
        // });
    }
);