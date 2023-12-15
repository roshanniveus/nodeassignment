const UserModel = require('../models/user.model');

class UserService {

    /**
     * 
     * @param {String} userName 
     * @param {String} password 
     * @returns {Promise<import('../models/user.model').IUserSchema>}
     */
    static async createuser(userName, password) {
        try {
            const create = new UserModel({ userName, password });
            console.log("create res==============", create)
            return await create.save();
        } catch (error) {
            console.log("create error===", error)
            throw error;
        }
    }

    /**
     * 
     * @param {String} userName 
     * @returns {Promise<import('../models/user.model').IUserSchema>}
     */
    static async getuserByUserName(userName) {
        try {
            const user = await UserModel.findOne({ userName });
            return user;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = UserService;