import nodemailer from "nodemailer";
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
        }
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
        const mailOptions = {
            from: "dieter@1983.gent",
            to: "d.walckiers@protonmail.com",
            subject: `Nieuwe inschrijving voor ${data.event_slug}`,
            html: `Nieuwe inschrijving voor ${data.event_slug} van ${data.first_name} ${data.last_name} (${data.email})! Bekijk alle inschrijvingen op supabase.com`,
            text: `Nieuwe inschrijving voor ${data.event_slug} van ${data.first_name} ${data.last_name} (${data.email})! Bekijk alle inschrijvingen op supabase.com`,
        };
        try {
            const transporter = nodemailer.createTransport({
                host: "mailing.labarraca.be",
                port: 587,
                secure: false,
                auth: {
                    user: "id8601_labarracabe",
                    pass: "OQRgefmGcorNqBh",
                },
            });
            const sendResult = await transporter.sendMail(mailOptions);
            const { accepted, rejected, response } = sendResult;
            console.log(`internal confirmation email sent to d.walckiers@protonmail.com with response: ${response} (accepted: ${accepted}, rejected: ${rejected})`);
        } catch (error) {
            console.error("Error sending internal confirmation email:", error);
            throw new Error("Failed to send internal confirmation email");
        }
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
        const mailOptions = {
            from: "dieter@1983.gent",
            to: data.email,
            subject: confirmationMailInfo.subject,
            html: confirmationMailInfo.body.replace(/(\r\n|\n|\r)/g, "<br>"),
            text: confirmationMailInfo.body,
        };
        try {
            const transporter = nodemailer.createTransport({
                host: "mailing.labarraca.be",
                port: 587,
                secure: false,
                auth: {
                    user: "id8601_labarracabe",
                    pass: "OQRgefmGcorNqBh",
                },
            });
            const sendResult = await transporter.sendMail(mailOptions);
            const { accepted, rejected, response } = sendResult;
            console.log(`subscriber confirmation email sent to ${data.email} with response: ${response} (accepted: ${accepted}, rejected: ${rejected})`);
        } catch (error) {
            console.error("Error sending subscriber confirmation email:", error);
            throw new Error("Failed to send subscriber confirmation email");
        }
    }
);