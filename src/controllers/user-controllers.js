const UserService = require('../services/user-services');

const userService = new UserService();

const createUser = async (req, res) => {
    try {
        const response = await userService.createUser({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        return res.status(201).json({
            success: true,
            message: 'Successfully created a new user',
            data: response,
            err: {}
        })
    } catch (error) {
        console.log("Something went wrong in controller");
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        })
    }
}

const signIn = async (req, res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password)
        return res.status(201).json({
            success: true,
            message: 'Successfully signIn',
            data: response,
            err: {}
        })
    } catch (error) {
        console.log("Something went wrong in signIn Process", error);
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        })
    }
}


const isAuthenticated = async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            success: true,
            err: {},
            data: response,
            message: 'user is authenticated and token is valid'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        });
    }
}

const activateAccount = async (req, res) => {
    try {
        const token = req.query.token;
        const response = await userService.activateAccount(token);
        return res.status(200).json({
            success: true,
            err: {},
            data: response,
            message: 'user is activated.'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        });
    }
}

module.exports = {
    createUser,
    signIn,
    isAuthenticated,
    activateAccount
}