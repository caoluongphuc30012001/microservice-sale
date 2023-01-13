require("dotenv").config();

var nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL_ADDRESS,
    pass: process.env.SMTP_EMAIL_PASSWORD,
  },
});

const sendEmail = async (toEmail, message) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_EMAIL_ADDRESS,
      to: toEmail,
      subject: "Sending from Sale's website",
      text: message,
    };

    transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = sendEmail;
