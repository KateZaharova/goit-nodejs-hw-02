import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const { GMAIL_PASSWORD, GMAIL_EMAIL } = process.env;

const nodemailerConfig = {
  host: "smtp.gmail.com", 
  port: 465, 
    secure: true,
  auth: {
    user: GMAIL_EMAIL,
    pass: GMAIL_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const email = {
  from: GMAIL_EMAIL,
  to: "sogivi9651@aseall.com",
  subject: "Test email",
  html: "<strong>Test email</strong>"
};

transport.sendMail(email)
  .then(() => console.log("Email send success"))
  .catch(error => console.log(GMAIL_EMAIL + GMAIL_PASSWORD +" send email error:" + error.message));


const sendEmail = data => {
    const email = { ...data, from: GMAIL_EMAIL };
    return transport.sendMail(email);
}


export default sendEmail;