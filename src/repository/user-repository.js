const UserModel = require('../models/user');

class UserRepository {

    async createUser(userDetail) {
        try {
            const user = await new UserModel(userDetail);
            await user.save();
            return user;
        } catch (error) {
            console.log("Something went wrong with repository layer.");
            throw (error);
        }
    }

    async getByEmail(userEmail) {
        try {
            const user = await UserModel.findOne({ email: userEmail });
            // console.log(user);
            return user;
        } catch (error) {
            console.log(error)
            console.log("Something went wrong with repository layer.");
            throw (error);
        }
    }

    async getById(userId) {
        try {
            const user = await UserModel.find({ _id: userId });
            return user;
        } catch (error) {
            console.log(error)
            console.log("Something went wrong with repository layer.");
            throw (error);
        }
    }

    async activeAccount(userId) {
        try {
            const updatedUser = await UserModel.updateOne({ _id: userId }, { status: true });
            return updatedUser;
        } catch (error) {
            console.log(error);
            console.log("Something went wrong with repository layer(activateAccount).");
            throw (error);
        }
    }
}

module.exports = UserRepository;