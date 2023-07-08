const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/serverConfig');
const bcrypt = require('bcrypt');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async createUser(userDetail) {
        try {
            const user = await this.userRepository.createUser(userDetail);
            return user;
        } catch (error) {
            console.log("Something went wrong with service layer.");
            throw (error);
        }
    }

    async signIn(email, plainPassword) {
        try {
            //- step 1-> fetch the user using the email
            const user = await this.userRepository.getByEmail(email);
            //- step 2-> compare incoming plain password with stores encrypted password
            console.log(plainPassword, user.password , user)
            const passwordsMatch = this.checkPassword(plainPassword, user.password);

            if (!passwordsMatch) {
                console.log("Password doesn't match");
                throw { error: 'Incorrect password' };
            }
            //- step 3-> if passwords match then create a token and send it to the user
            const newJWT = this.createToken({ email: user.email, id: user.id });
            return newJWT;
        } catch (error) {
            console.log("Something went wrong in the sign in process", error);
            throw error;
        }
    }

    // async isAuthenticated(token) {
    //     try {
    //         const response = this.verifyToken(token);
    //         if (!response) {
    //             throw { error: 'Invalid token' }
    //         }
    //         const user = await this.userRepository.findById(response._id);
    //         if (!user) {
    //             throw { error: 'No user with the corresponding token exists' };
    //         }
    //         return user._id;
    //     } catch (error) {
    //         console.log("Something went wrong in the auth process");
    //         throw error;
    //     }
    // }

    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, { expiresIn: '1d' });
            return result;
        } catch (error) {
            console.log("Something went wrong in token creation.", error);
            throw error;
        }
    }

    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in token validation.", error);
            throw error;
        }
    }

    checkPassword(userInputPlainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in password comparison.", error);
            throw error;
        }
    }


}

module.exports = UserService;