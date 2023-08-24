const nodemailer = require("nodemailer");
const Email = require("email-templates");
const {
  nodemailerEmail,
  emailClientID,
  emailClientSecret,
  emailRefreshToken,
  SES_CONFIG,
} = require("../../config/vars");
const { google } = require("googleapis");
// const AWS = require("aws-sdk");

// SMTP is the main transport in Nodemailer for delivering messages.
// SMTP is also the protocol used between almost all email hosts, so its truly universal.
// if you dont want to use SMTP you can create your own transport here
// such as an email service API or nodemailer-sendgrid-transport
// const AWS_SES = new AWS.SES(SES_CONFIG);
const oAuth = google.auth.OAuth2;
const oAuth2Client = new oAuth(
  emailClientID,
  emailClientSecret,
  "https://developers.google.com/oauthplayground"
);
oAuth2Client.setCredentials({ refresh_token: emailRefreshToken });
const accessToken = oAuth2Client.getAccessToken();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  // requireTLS: true,
  auth: {
    type: "OAuth2",
    user: nodemailerEmail,
    clientId: emailClientID,
    clientSecret: emailClientSecret,
    refreshToken: emailRefreshToken,
    accessToken: accessToken,
  },
});

// verify connection configuration
transporter.verify((error) => {
  if (error) {
    console.log("err", error);
  }
});

exports.sendMail = async (mailObj) => {
  const emailConfig = {
    from: "dork7",
    to: mailObj.email,
    subject: mailObj.subject,
    text: `${mailObj.mailBody}`,
    html: `<p>${mailObj.mailBody}</p>`,
  };

  return transporter
    .sendMail(emailConfig)
    .then((info) => info)
    .catch((err) => console.log(`Problem sending email: ${err}`));
};
