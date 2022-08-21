const nodemailer = require("nodemailer");
const config = require("config");

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: config.get("user"),
    pass: config.get("pass"),
  },
});

module.exports = sendConfirmationEmail = (name, email, confirmationCode) => {
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
          <a href=http://localhost:5000/api/verifyuser/${confirmationCode}> Click here</a>
          </div>`,
    })
    .catch((err) => console.log(err));
};
