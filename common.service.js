"use strict";
const nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');



exports.mailer = async function main(body) {
  console.log("From here we need to send email" , body)
  let transporter = nodemailer.createTransport(smtpTransport({
    service:"gmail",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'amansingh199835@gmail.com',
      pass: 'nldopttqyfbbxalb',
    },
  }));

  // send mail with defined transport object
   let info = await transporter.sendMail({
    from: 'amansingh199835@gmail.com', // sender address
    to: body.email, // list of receivers
    subject:"Your Password for recovery is...", // Subject line
    text: "Password: "+body.password, // plain text body
  });

  console.log("Message sent: %s", info.messageId);

console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}








