const express = require("express");
const { UserController } = require("../../../controllers");
const { AuthRequestMiddlewares,UserMiddlewares , UserDetailsMiddlewares,} = require("../../../middlewares");

const router = express.Router();

router.post( "/login", AuthRequestMiddlewares.validateAuthRequest,UserController.login);
router.post("/register",UserMiddlewares.validateCreateUserRequest,UserDetailsMiddlewares.validateCreateUserDetailRequest,UserController.registerUser);

router.post('/:id',UserMiddlewares.validateUpdateUserRequest,UserDetailsMiddlewares.validateUpdateUserDetailRequest,UserController.updateUser);
router.post('/:id',UserMiddlewares.checkAuthentication,UserMiddlewares.validateUpdateUserRequest,UserDetailsMiddlewares.validateUpdateUserDetailRequest,UserController.updateUser);
router.delete('/:id',UserMiddlewares.checkAuthentication,UserController.deleteUser);
router.get('/',UserMiddlewares.isadmin,UserController.getAllUsers);
router.get('/:id',UserMiddlewares.isadmin,UserController.getUsers);



module.exports = router;
