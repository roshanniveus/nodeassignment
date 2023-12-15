const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/transaction.controller');
const RedisMiddleware = require('../middlewares/caching.middleware');

router.post('/createTransaction', TransactionController.createTransaction);
router.get('/getTransaction', TransactionController.getTransaction);
router.get('/getItemTransaction', RedisMiddleware.checkCacheItem, TransactionController.getItemTransaction);



module.exports = router;