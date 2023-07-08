const express = require('express');
const router = express.Router();

const UserController = require('../../controllers/user-controllers')

router.post('/signup', UserController.createUser);
router.post('/signin', UserController.signIn);

module.exports = router;