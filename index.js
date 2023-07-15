const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { PORT } = require('./src/config/serverConfig');
const ApiRoutes = require('./src/routes/index')

const databaseConnect = require('./src/config/databaseConfig');

const setUpAndStartServer = async () => {
    //- connect to database
    try {
        await databaseConnect();
    } catch (error) {
        console.log('Error connecting to the database:', error);
    }

    //- create the express object
    const app = express();

    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/api', ApiRoutes);

    app.listen(PORT, async () => {
        console.log(`Server Started at port : ${PORT}`);
    })
}

setUpAndStartServer();