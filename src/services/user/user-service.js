const { StatusCodes } = require('http-status-codes');
const AppError = require('../../utils/errors/app-error');
const { Auth } = require('../../utils/common')
const { UserRepository } = require('../../repositories');

const jsonwebtoken = require("jsonwebtoken")

const {Enums} = require('../../utils/common')
const userRoles = Enums.userRoles;


const userRepo = new UserRepository();

async function login(data) {
    try {

        const user = await userRepo.getUserByName(data.username);
        if (!user) {
            throw new AppError('Bad credential', StatusCodes.NOT_FOUND);
        }
        const passwordMatch = Auth.checkPassword(data.password, user.password);
        if (!passwordMatch) {
            throw new AppError('Bad credential', StatusCodes.BAD_REQUEST);
        }
        const user_role = userRoles[user.role_id]
        const jwt = Auth.createToken({ id: user.id, username: user.username , role: user_role });
        return { 'userid': user.id, 'userRole':user_role, 'token': jwt};
    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function registerUser(data) {
    try {
      
      const user = await userRepo.create(data);
      return user;
    } catch (error) {
      console.log(error.name, error.message);
      if (error.name == "SequelizeValidationError") {
        let explanation = [];
        error.errors.forEach((err) => {
          explanation.push(err.message);
        });
        throw new AppError(explanation, StatusCodes.BAD_REQUEST);
      } else if (error.name == "SequelizeForeignKeyConstraintError") {
        throw new AppError(error.message, StatusCodes.BAD_REQUEST);
      } else if (error.name == "SequelizeUniqueConstraintError") {
        throw new AppError(error.message, StatusCodes.BAD_REQUEST);
      } else if (error.statusCode == StatusCodes.NOT_FOUND) {
        throw new AppError(error.message, StatusCodes.NOT_FOUND);
      }
      throw new AppError(
        "Cannot create the user object",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }



  

  async function getAllUser(req, res) {
    try {
      const user = await userRepo.getAll();
      return user;
    } catch (error) {
      console.log(error);
      throw new AppError(
        "Cannot get all Users objects",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
  

  

module.exports = {
    login,
    
    registerUser,
   
    getAllUser,
    
    
}