const UserService = require('../services/user.service');

exports.createUser = async (req, res, next) => {
    try {
        console.log("in controller==", req.body);
        const { userName, password } = req.body;

        const login = await UserService.getuserByUserName(userName);
        if(login){
            res.json({ status: false, success: 'User already exists' });
            return;
        }

        const create = await UserService.createuser(userName, password);
        if (!create) {
            res.json({ status: false, success: 'User not created' });
            return;
        }
        res.json({ status: true, success: 'User created successfully' });
    } catch (error) {
        next(error);
    }
}


exports.loginUser = async (req, res, next) => {
    try {
        const { userName, password } = req.body;

        const login = await UserService.getuserByUserName(userName);
        if (!login) {
            res.json({ status: false, success: 'Invalid username' });
            return;
        }

        const compare = await login.comparePassword(password);

        if(!compare){
            res.json({ status: false, success: 'Invalid password' });
            return;
        }

        res.json({ status: true, success: 'User logged in successfully' });
    } catch (error) {
        console.log("errorr=",error);
        next(error);
    }
}