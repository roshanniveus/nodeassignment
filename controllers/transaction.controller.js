const TransactionService = require('../services/transaction.service');
const RedisService = require('../services/redis.service');

exports.createTransaction = async (req, res, next) => {
    try {
        const { userId, item, amount } = req.body;

        const create = await TransactionService.createTransaction(userId, item, amount);
        if (!create) {
            res.json({ status: false, success: 'Transaction not created' });
            return;
        }
        res.json({ status: true, success: 'Transaction created successfully' });
    } catch (error) {
        next(error);
    }
}


exports.getTransaction = async (req, res, next) => {
    try {
        let { userId, item, amount, fromDate, toDate, fromAmount, toAmount, limit, offset } = req.body;
        if (!limit) {
            limit = 0;
        }
        if (!offset) {
            offset = 0;
        }

        const transactions = await TransactionService.getTransaction(userId, item, amount, fromDate, toDate, fromAmount, toAmount, limit, offset);
        if (!transactions.transactions.length) {
            res.json({ status: false, success: [] });
            return;
        }
        res.json({ status: true, success: transactions.transactions, totalCount: transactions.countTransaction });
    } catch (error) {
        next(error);
    }
}

exports.getItemTransaction = async (req, res, next) => {
    try {
        let { item } = req.body;


        const transactions = await TransactionService.getItemTransaction(item);
        if (!transactions.length) {
            res.json({ status: false, success: [] });
            return;
        }
        await RedisService.setDataByKey(item, transactions);
        res.json({ status: true, success: transactions });
    } catch (error) {
        next(error);
    }
}