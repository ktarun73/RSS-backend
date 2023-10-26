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

        const user = await userRepo.getUserByUserName(data.username);
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


  

  async function updateUser(id, data) {
    try {
      const user = await userRepo.update(id, data);
      return user;
    } catch (error) {
      if (error.name == "SequelizeValidationError") {
        let explanation = [];
        error.errors.forEach((err) => {
          explanation.push(err.message);
        });
        throw new AppError(explanation, StatusCodes.BAD_REQUEST);
      } else if (error.name == "SequelizeForeignKeyConstraintError") {
        throw new AppError(error.message, StatusCodes.BAD_REQUEST);
      } else if (error.statusCode == StatusCodes.NOT_FOUND) {
        throw new AppError(error.message, StatusCodes.NOT_FOUND);
      }
      throw new AppError(
        "Cannot update the user object",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async function deleteUser(id, data) {
    try {
      const user = await userRepo.destroy(id, data);
      return user;
    } catch (error) {
      if (error.name == "SequelizeValidationError") {
        let explanation = [];
        error.errors.forEach((err) => {
          explanation.push(err.message);
        });
        throw new AppError(explanation, StatusCodes.BAD_REQUEST);
      } else if (error.name == "SequelizeForeignKeyConstraintError") {
        throw new AppError(error.message, StatusCodes.BAD_REQUEST);
      } else if (error.statusCode == StatusCodes.NOT_FOUND) {
        throw new AppError(error.message, StatusCodes.NOT_FOUND);
      }
      throw new AppError(
        "Cannot update the user object",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }


  

  async function getAllUser() {
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

  async function getUser(id) {
    try {
      const user = await userRepo.get(id);
      return user;
    } catch (error) {
      console.log(error);
      throw new AppError(
        "Cannot get User object",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
  

  async function isAuthenticated(token) {
    try {
        if (!token) {
            throw new AppError('Missing Token', StatusCodes.BAD_REQUEST);
        }
        const response = Auth.verifyToken(token);
        const user = await userRepo.get(response.id);
        if (!user) {
            throw new AppError('No user found', StatusCodes.NOT_FOUND);
        }
        return user;
    } catch (error) {
        if (error instanceof AppError) throw error;
        if (error.name == 'JsonWebTokenError') {
            throw new AppError('Bad credentials', StatusCodes.BAD_REQUEST);
        }
        if (error.name == 'TokenExpiredError') {
            throw new AppError('Token Expired', StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getUserByUsername(username) {
  try {
    const user = await userRepo.getUserByUserName(username);
    return user;
  } catch (error) {
    console.log(error);
    throw new AppError(
      "Cannot get User object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
  

module.exports = {
    login,
    registerUser,
    getAllUser,
    updateUser,
    getUser,
    deleteUser,
    isAuthenticated,
    getUserByUsername
}