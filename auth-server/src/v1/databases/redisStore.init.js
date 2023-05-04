const RedisStore = require("connect-redis").default;

const Redis = require("ioredis")

const redisClient = new Redis(6379,process.env.REDIS_HOST)



module.exports = new RedisStore({
  client: redisClient,
})