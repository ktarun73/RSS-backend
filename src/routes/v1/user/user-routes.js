const express = require("express");
const { UserController } = require("../../../controllers");
const { AuthRequestMiddlewares,UserMiddlewares , UserDetailsMiddlewares} = require("../../../middlewares");

const router = express.Router();

router.post( "/login", AuthRequestMiddlewares.validateAuthRequest,UserController.login);
router.post("/register",UserMiddlewares.validateCreateUserRequest,UserDetailsMiddlewares.validateCreateUserDetailRequest,UserController.registerUser);
router.post('/:id',UserMiddlewares.checkAuthentication,UserMiddlewares.validateUpdateUserRequest,UserDetailsMiddlewares.validateUpdateUserDetailRequest,UserController.updateUser);



module.exports = router;
