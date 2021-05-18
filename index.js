const fs = require('fs');
const readline = require('readline');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// These id's and secrets should come from .env file.
const CLIENT_ID = '368245988063-7dap707cfgoku8h1pue8e4lgmp05qcnc.apps.googleusercontent.com';
const CLIENT_SECRET = 'qKbyBoAvO8AWe8bOeS3Zq3NU';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04pofNd6AU6WBCgYIARAAGAQSNwF-L9IrVxy8F4qMZj_LVD56KHWR6BIhQCe7nFOHYWQ7fGcf9HV5pCQJ7ipYVoGNtF3ucvwSQDE';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'shindesumit268@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: 'shindesumit268@gmail.com',
      to: 'shinde2000sumit@gmail.com',
      subject: 'Intern Assignment',
      text: 'Success, I guess :p',
      html: '<h1>Success, I guess :p</h1>',
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

sendMail()
  .then((result) => console.log('Email sent...', result))
  .catch((error) => console.log(error.message));