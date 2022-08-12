import nodemailer from "nodemailer";
import { buildSendMail } from "mailing-core";

// const transport = nodemailer.createTransport({
//   pool: true,
//   host: "smtp.example.com",
//   port: 465,
//   secure: true, // use TLS
//   auth: {
//     user: "username",
//     pass: "password",
//   },
// });

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "e5c96eac647ec4",
        pass: "6db5cdea47c29e",
    },
});

const sendMail = buildSendMail({
    transport,
    defaultFrom: "no-reply@mailergraph.com",
});

export default sendMail;
