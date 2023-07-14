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
            const user = await this.userRepository.createUser(
                {
                    ...userDetail,
                    status: false
                });
            const newJWT = this.createToken({ id: user._id }, '1d');
            //- send token in mail or any other medium
            return newJWT;
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
            const passwordsMatch = this.checkPassword(plainPassword, user.password);

            if (!passwordsMatch) {
                console.log("Password doesn't match");
                throw { error: 'Incorrect password' };
            }
            //- step 3-> if passwords match then create a token and send it to the user
            const newJWT = this.createToken({ email: user.email, id: user._id }, '1d');
            return newJWT;
        } catch (error) {
            console.log("Something went wrong in the sign in process", error);
            throw error;
        }
    }

    async isAuthenticated(token) {
        try {
            const response = this.verifyToken(token);
            if (!response) {
                throw { error: 'Invalid token' }
            }
            const user = await this.userRepository.getById(response._id);
            if (!user) {
                throw { error: 'No user with the corresponding token exists' };
            }
            return user._id;
        } catch (error) {
            console.log("Something went wrong in the auth process");
            throw error;
        }
    }

    createToken(user, expTime) {
        try {
            const result = jwt.sign(user, JWT_KEY, { expiresIn: expTime });
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

    async activateAccount(token) {
        try {
            const response = this.verifyToken(token);
            console.log(response)
            if (!response) {
                throw { error: 'Invalid token' }
            }
            //- update isActivated to true and save it into database
            const user = await this.userRepository.activeAccount(response.id);
            token
            return user.status;
        } catch (error) {
            console.log("Something went wrong in activate account.", error);
            throw error;
        }
    }
}

module.exports = UserService;