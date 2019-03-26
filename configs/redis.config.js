const Bluebird = require("bluebird");
const Redis = require("redis");
const EnvConfig = require('./env')

Bluebird.promisifyAll(Redis);
client = Redis.createClient({
    host: EnvConfig.redis.host
});

client.on("error", (err) => {
    console.log("Redis client error", err);
});

module.exports = client;