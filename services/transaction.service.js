const TransactionModel = require('../models/transaction.model');

class TransactionService {

    /**
     * 
     * @param {String} userId 
     * @param {String} item 
     * @param {Number} amount 
     * @returns {Promise<import('../models/transaction.model').ITransactionSchema>}
     */
    static async createTransaction(userId, item, amount) {
        try {
            const create = new TransactionModel({ userId, item, amount });
            return await create.save();
        } catch (error) {
            throw error;
        }
    }


    /**
     * 
     * @param {String} userId 
     * @param {String} item 
     * @param {Number} amount 
     * @param {Date} fromDate 
     * @param {Date} toDate 
     * @param {Number} fromAmount 
     * @param {Number} toAmount 
     * @param {Number} limit 
     * @param {Number} offset 
     * @returns {Promise<{transactions:import('../models/transaction.model').ITransactionSchema[], countTransaction : Number}>}
     */
    static async getTransaction(userId, item, amount, fromDate, toDate, fromAmount, toAmount, limit, offset) {
        try {
            const matchConditon = { userId: userId };

            if (item) {
                matchConditon['item'] = item;
            }

            if (amount) {
                matchConditon['amount'] = amount;
            }

            if (fromDate) {
                matchConditon['createdAt'] = { $gte: fromDate };
            }

            if (toDate) {
                matchConditon['createdAt'] = { $lt: toDate };
            }

            if (fromAmount) {
                matchConditon['amount'] = { $gte: fromAmount };
            }

            if (toAmount) {
                matchConditon['createdAt'] = { $lt: toAmount };
            }

            const transactions = await TransactionModel.find(matchConditon).skip(offset).limit(limit);
            const countTransaction = await TransactionModel.countDocuments(matchConditon);

            return { transactions, countTransaction };
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param {String} item 
     * @returns {Promise<import('../models/transaction.model').ITransactionSchema[]>}
     */
    static async getItemTransaction(item) {
        try {
            const matchConditon = { item };

            const transactions = await TransactionModel.find(matchConditon);

            return transactions;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = TransactionService;