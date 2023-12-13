import express from "express";
import logger from "morgan";
import cors from "cors";
import contactsRouter from "./routes/api/contacts-router.js";
import authRouter from "./routes/api/auth-router.js";
import dotenv from "dotenv";
//import ElasticEmail from "@elasticemail/elasticemail-client";
import nodemailer from "nodemailer";

dotenv.config();

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';


app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static("public"))

app.use("/users", authRouter)
app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message, })
})


/*const { ELASTICEMAIL_API_KEY, ELASTICEMAIL_EMAIL_FROM } = process.env;

const defaultClient = ElasticEmail.ApiClient.instance;
 
const { apikey } = defaultClient.authentications;
apikey.apiKey = ELASTICEMAIL_API_KEY;
 
const api = new ElasticEmail.EmailsApi()
 
const email = ElasticEmail.EmailMessageData.constructFromObject({
  Recipients: [
    new ElasticEmail.EmailRecipient("lodet95565@getmola.com ")
  ],
  Content: {
    Body: [
      ElasticEmail.BodyPart.constructFromObject({
        ContentType: "HTML",
        Content: "<strong> My test email content </strong> ;)"
      })
    ],
    Subject: "Test email from Kate",
    From: ELASTICEMAIL_EMAIL_FROM,
    }
});
 
const callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
api.emailsPost(email, callback);*/

const { UKR_NET_PASSWORD, UKR_NET_EMAIL } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: UKR_NET_EMAIL,
    pass: UKR_NET_PASSWORD,
  }
};

const transport = nodemailer.createTransport(nodemailerConfig);

const email = {
  from: UKR_NET_EMAIL,
  to: "lodet95565@getmola.com",
  subject: "Test email",
  html: "<strong>Test email</strong>"
};

transport.sendMail(email)
  .then(() => console.log("Email send success"))
  .catch(error => console.log(error.message));

export default app;
