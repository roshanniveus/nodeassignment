const redis = require('../config/redis');

class RedisService {

    static async getDataByKey(key) {
        return await redis.get(key);
    }

    static async setDataByKey(key, data) {
        await redis.set(key, JSON.stringify(data));
        await redis.setEx(key, 60 * 2);
        return;
    }

    static async rmKey(key){
        return redis.del(key);
    }

    static async flushKeys(){
        return redis.flushDb();
    }
}

module.exports = RedisService;