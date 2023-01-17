const receive = require("./src/rabbitmq/receive.js");

const sendEmail = require("./src/services/send-email.service.js");

receive("send_email", "verify_account", sendEmail);
