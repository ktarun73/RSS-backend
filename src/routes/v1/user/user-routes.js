const express = require("express");
const { UserController } = require("../../../controllers");
const {
  AuthRequestMiddlewares,
  UserMiddlewares,
} = require("../../../middlewares");

const router = express.Router();

router.post( "/login", AuthRequestMiddlewares.validateAuthRequest,UserController.login);
router.post("/register",UserMiddlewares.validateCreateUserRequest,UserController.registerUser);




module.exports = router;
