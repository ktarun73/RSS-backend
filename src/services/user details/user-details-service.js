const { StatusCodes } = require('http-status-codes');
const AppError = require('../../utils/errors/app-error');
const { UserDetailsRepository } = require('../../repositories');

const userDetailsRepo = new UserDetailsRepository();


  
async function createUserDetails(data) {
    try {
      
      const userDetails = await userDetailsRepo.create(data);
      return userDetails;
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
        "Cannot create the user details object",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
  async function updateUserDetails(id, data) {
    try {
    
      const userDetails = await userDetailsRepo.update(id, data);
      
      return userDetails;
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
        "Cannot create the user detail object",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
  async function deleteUserDetails(id, data) {
    try {
      const user = await userDetailsRepo.destroy(id, data);
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
  
  async function getUserDetailsByUserId(id) {
    try {
      const userDetails = await userDetailsRepo.getUserDetails(id);
      return userDetails;
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
        "Cannot update the user detail object",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
  async function getAllUserDetails() {
    try {
      const user = await userDetailsRepo.getAll();
      return user;
    } catch (error) {
      console.log(error);
      throw new AppError(
        "Cannot get all Users objects",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
  async function getUserDetails(id) {
    try {
      const user = await userDetailsRepo.get(id);
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
    createUserDetails,
    updateUserDetails,
    getUserDetailsByUserId,
    deleteUserDetails,
    getAllUserDetails,
    getUserDetails,
    
}