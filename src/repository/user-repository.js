const UserModel = require('../models/user');

class UserRepository {

    async createUser(userDetail) {
        try {
            const user = await new UserModel(userDetail);
            console.log(user);
            user.save();
            return user;
        } catch (error) {
            console.log("Something went wrong with repository layer.");
            throw (error);
        }
    }

    async getByEmail(userEmail) {
        try {
            const user = await UserModel.findOne({ email: userEmail });
            return user;
        } catch (error) {
            console.log(error)
            console.log("Something went wrong with repository layer.");
            throw (error);
        }
    }
}

module.exports = UserRepository;