const express = require("express");
const { UserController } = require("../../../controllers");
const { AuthRequestMiddlewares , UserMiddlewares , UserDetailsMiddlewares } = require("../../../middlewares");

const router = express.Router();



router.get('/',UserMiddlewares.validateForgotPasswordRequest);


module.exports = router;
