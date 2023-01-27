const receive = require("./src/rabbitmq/receive.js");
const sendEmailForgotPassword = require("./src/services/send-email-forgot-password.service.js");

const sendEmailVerify = require("./src/services/send-email-verify.service.js");

receive("send_email", "verify_account", sendEmailVerify);

receive("send_email", "forgot_password", sendEmailForgotPassword);
