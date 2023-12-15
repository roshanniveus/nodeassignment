const redis = require('redis');
const { redisConfig } = require('./config');

const redisCache = redis.createClient({
    url: `redis://${redisConfig.host}:${redisConfig.port}`
});

redisCache.on('connect', () => console.log('!!...Connected to Redis...!!'));
redisCache.on('error', (err) => console.log('----Redis Client error----', err));

redisCache.connect();

module.exports = redisCache;

