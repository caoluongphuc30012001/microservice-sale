const amqplib = require("amqplib");

const amqpURL = process.env.AMQP_URL || "amqp://localhost:5672";

const sender = async (exchangeName, topic, message) => {
  try {
    //create connection
    const connect = await amqplib.connect(amqpURL);

    //create channel
    const channel = await connect.createChannel();

    //create exchange
    await channel.assertExchange(exchangeName, "topic", {
      durable: false,
    });

    //publish message
    channel.publish(exchangeName, topic, Buffer.from(message));

    //close connection
    setTimeout(() => {
      connect.close();
    }, 1000);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = sender;
