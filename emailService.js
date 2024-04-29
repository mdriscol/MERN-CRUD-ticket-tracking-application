// emailService.js
const nodemailer = require("nodemailer");
require('dotenv').config();
const ejs = require("ejs");
const path = require("path");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Render the EJS template
const templatePath = path.join(__dirname, "./views/ticketSubmission.ejs");
  const html = await ejs.renderFile(templatePath, { request: options.request });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: options.recipients,
    subject: options.subject,
    html, // send the rendered EJS template
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = { sendEmail };