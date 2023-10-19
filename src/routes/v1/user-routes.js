const express = require('express');
const { UserController } = require('../../controllers')
const { AuthRequestMiddlewares } = require('../../middlewares')

const router = express.Router();

router.post('/login',AuthRequestMiddlewares.validateAuthRequest,UserController.login);

module.exports = router;