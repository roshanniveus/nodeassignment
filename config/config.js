const dotenv = require('dotenv');
dotenv.config();

const keys = {
    mongodbConfig: {
        host: process.env.MONGODB_HOST || 'localhost',
        port: '27017',
        dbName: 'assignment',
        user: 'roshan',
        password: 'roshan@321'
    },
    role: ['superAdmin', 'customer', 'subAdmin'],
    superAdminRole: 'superAdmin',
    Bcrypt_Salt: 12,
    redisConfig: {
        host: process.env.REDIS_HOST || 'localhost',
        port: 6379
    }
}

module.exports = keys;