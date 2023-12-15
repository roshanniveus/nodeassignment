// const db = require('../config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const config = require('../config/config');
const bcrypt = require('bcrypt');

/**
 * @typedef {Object} IUserSchema
 * @property {String} userName
 * @property {String} password
 * @property {String} role
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */
const UserSchema = new Schema({
    userName: {
        type: String,
        required: [true, 'User name cannot be empty'],
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: config.role,
        default: config.superAdminRole
    }
}, { timestamps: true });


UserSchema.pre('save', async function () {
    const user = this;
    if (!user.isModified('password')) {
        return;
    }

    try {
        const salt = await bcrypt.genSalt(config.Bcrypt_Salt);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
    } catch (error) {
        throw error;
    }
});

UserSchema.methods.comparePassword = async function (password) {
    try {
        const isMatch = await bcrypt.compare(password, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
};

/**@typedef {IUserSchema & mongoose.Document} */
/** @type {mongoose.Model<IUserSchema>} */

const userModel = mongoose.model('user', UserSchema);
module.exports = userModel;
