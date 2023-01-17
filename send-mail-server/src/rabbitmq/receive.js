const amqplib = require("amqplib");

const amqpURL = process.env.AMQP_URL || "amqp://localhost:5672";

const receive = async (exchangeName, topic, action) => {
  try {
    // create connection
    const connect = await amqplib.connect(amqpURL);

    //create channel
    const channel = await connect.createChannel();

    //create exchange
    await channel.assertExchange(exchangeName, "topic", {
      durable: false,
    });

    //create queue
    const { queue } = await channel.assertQueue("", {
      exclusive: true,
    });
    //binding queue
    await channel.bindQueue(queue, exchangeName, topic);
    //consume
    await channel.consume(queue, (msg) => {
      const message = JSON.parse(msg.content.toString());
      action(message.email, message.message);
    });
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = receive;
