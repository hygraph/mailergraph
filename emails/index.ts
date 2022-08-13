import nodemailer from "nodemailer";
import { buildSendMail } from "mailing-core";
import { Options } from "nodemailer/lib/smtp-connection";

const host: string = process.env.EMAIL_HOST ?? "";
const port: number = process.env.EMAIL_PORT as any;
const user: string = process.env.EMAIL_USER ?? "";
const pass: string = process.env.EMAIL_PASS ?? "";
let defaultFrom: string = process.env.EMAIL_FROM ?? "noreply@example.com";

let smtpOptions: Options = {
    host,
    port,
    auth: {
        user,
        pass,
    },
};

export function setConfig(options: any) {
    const { config } = options;
    if (config) {
        smtpOptions.host = config.HOST;
        smtpOptions.port = config.PORT as number;
        smtpOptions.auth = {
            user: config.USER,
            pass: config.PASS,
        };
        defaultFrom = config.EMAIL_FROM;
    }
}

const transport = nodemailer.createTransport(smtpOptions);
const sendMail = buildSendMail({
    transport,
    defaultFrom,
});

export default sendMail;
