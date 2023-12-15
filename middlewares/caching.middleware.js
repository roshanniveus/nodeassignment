const RedisService = require('../services/redis.service');

exports.checkCacheItem = async (req, res, next) => {
    const { item } = req.body;

    const data = await RedisService.getDataByKey(item);
    // console.log("redis data==",data, JSON.parse(data));
    if (!data) {
        console.log("in !data");
        next();
        return;
    }
    const parseData = JSON.parse(data);
    console.log("parseData==", parseData);
    res.json({ status: true, success: parseData });
}