import nodemailer from "nodemailer";
import { buildSendMail } from "mailing-core";
import { Options } from "nodemailer/lib/smtp-connection";

const host: string = process.env.EMAIL_HOST ?? "";
const port: number = process.env.EMAIL_PORT as any;
const user: string = process.env.EMAIL_USER ?? "";
const pass: string = process.env.EMAIL_PASS ?? "";
const defaultFrom: string = process.env.EMAIL_FROM ?? "noreply@example.com";

const smtpOptions: Options = {
    host,
    port,
    auth: {
        user,
        pass,
    },
};

const transport = nodemailer.createTransport(smtpOptions);

const sendMail = buildSendMail({
    transport,
    defaultFrom,
});

export default sendMail;
