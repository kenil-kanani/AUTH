const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SALT } = require('../config/serverConfig');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'User name is required'],
        trim: true
    },
    email: {
        type: String,
        unique: [true, 'Email already registered'],
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    status: {
        type: Boolean,
        default: false,
        required:[true , 'Status is required to validate new user']
    }
});

userSchema.pre('save', async function () {
    const encryptedPassword = bcrypt.hashSync(this.password, SALT);
    this.password = encryptedPassword;
});

const UserModel = mongoose.model('users', userSchema);
module.exports = UserModel;
