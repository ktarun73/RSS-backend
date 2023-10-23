const { StatusCodes } = require("http-status-codes");

const { ErrorResponse } = require("../../utils/common");
const AppError = require("../../utils/errors/app-error");
const {UserRepository} = require('../../repositories')
const userRepo = new UserRepository();

async function validateCreateUserRequest(req, res, next) {
  const bodyReq = req.body;
  if (!req.is("application/json")) {
    ErrorResponse.message = "Something went wrong";
    ErrorResponse.error = new AppError(
      ["Content type must be of application/json"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  else if (!bodyReq.username) {
    ErrorResponse.message = "Something went to wrong";
    ErrorResponse.error = new AppError(
      ["username parameter missing in the incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  } 
  else if (bodyReq.username) {
    const user = await userRepo.getUserByName(bodyReq.username);
    if (user) {
        ErrorResponse.message = 'Something went wrong';
        ErrorResponse.error = new AppError([' username already exist'], StatusCodes.BAD_REQUEST)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
}
else if (!bodyReq.password) {
    ErrorResponse.message = "Something went to wrong";
    ErrorResponse.error = new AppError(
      ["password parameter missing in the incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  } 
  else if (!bodyReq.role_id) {
    ErrorResponse.message = "Something went to wrong";
    ErrorResponse.error = new AppError(
      ["role_id parameter missing in the incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

async function validateUpdateUserRequest(req, res, next) {
  const bodyReq = req.body;
  if (!req.is('application/json')) {
      ErrorResponse.message = 'Something went wrong';
      ErrorResponse.error = new AppError(['Content type must be of application/json'], StatusCodes.BAD_REQUEST)
      return res
          .status(StatusCodes.BAD_REQUEST)
          .json(ErrorResponse);
  }
  else if (!bodyReq.password) {
    ErrorResponse.message = "Something went to wrong";
    ErrorResponse.error = new AppError(
      ["password parameter missing in the incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  
  next();
}

module.exports = {
  validateCreateUserRequest,
  validateUpdateUserRequest,
};
