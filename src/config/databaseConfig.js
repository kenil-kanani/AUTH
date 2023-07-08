const mongoose = require('mongoose');

const { MONGODB_URL } = require('./serverConfig');

const databaseConnect = async () => {
    try {
        await mongoose.connect(MONGODB_URL);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Something went wrong in the database connection.");
        throw error;
    }
}

module.exports = databaseConnect;