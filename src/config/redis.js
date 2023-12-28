const redis = require("redis");
const { redisHost, redisPort } = require("../config/vars");

const CONF = {
  db: 5,
  host: redisHost,
  port: redisPort,
};


const redisClient = redis.createClient(CONF);

// exports.redisClient = redisClient

const publisher = redisClient.duplicate();

const subscriber = redisClient.duplicate();



publisher.on('connect', () => {
  console.log('publisher to Redis server');
});
subscriber.on('connect', () => {
  console.log('subscriber to Redis server');
});


(async () => {

  await subscriber.subscribe('PUBSUB_CHANNEL', (message, channel, _) => {
    console.log(channel, message); // 'message'
  });
  // Subscribe to a channel
  subscriber.on('subscribe', (channel, count) => {
    console.log(`Subscribed to ${channel}. Total subscriptions: ${count}`);
  });
  // Publish a message after a delay
  setTimeout(() => {
    // Use the publisher client to publish the message
    publisher.publish('PUBSUB_CHANNEL', 'Hello, subscribers!');
  }, 2000);

})()


module.exports = { publisher, subscriber, redisClient }