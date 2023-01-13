const amqplib = require("amqplib");

const sender = async (exchangeName, topic, message) => {
  try {
    //create connection
    const connect = await amqplib.connect(process.env.AMQP_URL);

    //create channel
    const channel = await connect.createChannel();

    //create exchange
    const exchange = await channel.assertExchange(exchangeName, "topic", {
      durable: false,
    });

    //publish message
    await channel.publish(exchange.exchange, topic, Buffer.from(message));

    //close connection
    connect.close();
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = sender;
