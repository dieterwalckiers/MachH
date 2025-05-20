import nodemailer from "nodemailer";
import { server$ } from "@builder.io/qwik-city";

const createTransporter = server$(
    function (
        smtpData: {
            serviceClient: string;
            privateKey: string;
        }
    ) {
        return nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                type: "OAuth2",
                user: "inschrijvingen@mach-h.be",
                serviceClient: smtpData.serviceClient,
                privateKey: smtpData.privateKey,
            },
        });
    }
);

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
        smtpData: {
            serviceClient: string;
            privateKey: string;
        }
    ) {
        await Promise.all([
            sendInternalEmail(smtpData, data),
            sendSubscriberEmail(smtpData, data, confirmationMailInfo),
        ]);
    }
);

const sendInternalEmail = server$(
    async function (
        smtpData: {
            serviceClient: string;
            privateKey: string;
        },
        data: {
            id: string;
            event_slug: string;
            first_name: string;
            last_name: string;
            email: string;
        },
    ) {
        const transporter = await createTransporter(smtpData);
        const mailOptions = {
            from: "Mach-H <inschrijvingen@mach-h.be>",
            to: "inschrijvingen@mach-h.be",
            subject: `Nieuwe inschrijving voor ${data.event_slug}`,
            html: `Nieuwe inschrijving voor ${data.event_slug} van ${data.first_name} ${data.last_name} (${data.email})! Bekijk alle inschrijvingen op supabase.com`,
            text: `Nieuwe inschrijving voor ${data.event_slug} van ${data.first_name} ${data.last_name} (${data.email})! Bekijk alle inschrijvingen op supabase.com`,
        };
        try {
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
        smtpData: {
            serviceClient: string;
            privateKey: string;
        },
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
        const transporter = await createTransporter(smtpData);
        const mailOptions = {
            from: "Mach-H <inschrijvingen@mach-h.be>",
            to: data.email,
            subject: confirmationMailInfo.subject,
            html: confirmationMailInfo.body.replace(/(\r\n|\n|\r)/g, "<br>"),
            text: confirmationMailInfo.body,
        };
        try {
            const sendResult = await transporter.sendMail(mailOptions);
            const { accepted, rejected, response } = sendResult;
            console.log(`subscriber confirmation email sent to ${data.email} with response: ${response} (accepted: ${accepted}, rejected: ${rejected})`);
        } catch (error) {
            console.error("Error sending subscriber confirmation email:", error);
            throw new Error("Failed to send subscriber confirmation email");
        }
    }
);