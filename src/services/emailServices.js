import { createTransport } from "nodemailer";
import "dotenv/config";

export const transporter = createTransport({
  host: process.env.HOST,
  port: process.env.PORTETHEREAL,
  auth: {
    user: process.env.EMAIL,
    password: process.env.PASSWORD,
  },
});

export const mailOptions = {
  from: process.env.EMAIL,
  to: process.env.EMAIL,
  subject: "Testing mail -NODEJS",
  text: "Testing mail BODY -NODEJS",
  html: `<h1>Bienvenido</h1>`,
  attachments: [
    {
      path: process.cwd() + "/src/services/adjunto.txt",
      filename: `resumen-de-cuenta-${process.env.EMAIL}.txt`,
    },
  ],
};
