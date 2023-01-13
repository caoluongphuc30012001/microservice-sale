const amqplib = require("amqplib");

const receive = async (exchangeName, topic, action) => {
  try {
    // create connection
    const connect = await amqplib.connect(process.env.AMQP_URL);

    //create channel
    const channel = await connect.createChannel();

    //create exchange
    const exchange = await channel.assertExchange();

    //create queue
    const { queue } = await channel.assertQueue("", {
      exclusive: true,
    });
    //binding queue
    await channel.bindQueue(queue, exchange.exchange, topic);
    //consume
    channel.consume(queue, (msg) => {});
  } catch (error) {
    console.error(error.message);
  }
};
