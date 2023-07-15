const nodemailer = require('nodemailer');
const { EMAIL_ID, EMAIL_PASSWORD } = require('../config/serverConfig');

function sendMail(userEmail, token) {
    //- Create a transporter with  Gmail account credentials
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL_ID,
            pass: EMAIL_PASSWORD
        }
    });

    token = "http://localhost:5001/api/v1/verify/" + token;
    //- Define the email options
    const mailOptions = {
        from: 'noreply.hezalt@gmail.com',
        to: userEmail,
        subject: 'Welcome to Hezalt - Verify Your Email',
        html: `
          <div style="background-color: #f1f1f1; padding: 20px;">
            <h2 style="color: #333333; font-family: Arial, sans-serif;">Welcome to Hezalt!</h2>
            <p style="color: #555555; font-family: Arial, sans-serif;">Thank you for signing up. To complete your registration, please click the following link to verify your email:</p>
            <p style="margin: 20px 0;">
              <a href="${token}" style="display: inline-block; padding: 10px 20px; background-color: #337ab7; color: #ffffff; text-decoration: none; font-family: Arial, sans-serif;">Click Me</a>
            </p>
            <p style="color: #555555; font-family: Arial, sans-serif;">Once verified, you will be able to access all the features and services provided by Hezalt.</p>
            <p style="color: #555555; font-family: Arial, sans-serif;">If you did not sign up for Hezalt, please ignore this email.</p>
            <p style="color: #555555; font-family: Arial, sans-serif;">Best regards,</p>
            <p style="color: #555555; font-family: Arial, sans-serif;">The Hezalt Team</p>
          </div>
        `
    };

    //- Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

module.exports = sendMail;