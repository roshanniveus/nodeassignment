// const db = require('../config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserModel = require('./user.model');


/**
 * @typedef {Object} ITransactionSchema
 * @property {String} userId
 * @property {String} item
 * @property {Number} amount
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */
const TransactionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: UserModel.modelName
    },
    item: {
        type: String,
        required: [true, 'Item name required']
    },
    amount: {
        type: Number,
        required: [true, 'Amount for item is required']
    }
}, { timestamps: true });


/**@typedef {ITransactionSchema & mongoose.Document} */
/** @type {mongoose.Model<ITransactionSchema>} */

const transactionModel = mongoose.model('transaction', TransactionSchema);
module.exports = transactionModel;
