import nodemailer from "nodemailer";

const { GMAIL_PASSWORD, GMAIL_EMAIL } = process.env;

const nodemailerConfig = {
  host: "smtp.gmail.com", /*SO="*/ /*imap.gmail.com*/ //; "smtp.office365.com", smtp.gmail.com
  port: 465, //  993 587
  secure: true,
  auth: {
    user: GMAIL_EMAIL,
    pass: GMAIL_PASSWORD,
  }
};

const transport = nodemailer.createTransport(nodemailerConfig);

const email = {
  from: GMAIL_EMAIL,
  to: "bafemah413@apdiv.com",
  subject: "Test email",
  html: "<strong>Test email</strong>"
};

transport.sendMail(email)
  .then(() => console.log("Email send success"))
  .catch(error => console.log(error.message));


const sendEmail = data => {
    const email = { ...data, from: GMAIL_EMAIL };
    return transport.sendMail(email);
}


export default sendEmail;