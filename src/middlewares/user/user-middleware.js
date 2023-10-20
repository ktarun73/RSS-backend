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
  } else if (!bodyReq.username) {
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
  } else if (!bodyReq.role_id) {
    ErrorResponse.message = "Something went to wrong";
    ErrorResponse.error = new AppError(
      ["role_id parameter missing in the incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  } 
  // else if (!bodyReq.mobile_number) {
  //   ErrorResponse.message = "Something went to wrong";
  //   ErrorResponse.error = new AppError(
  //     ["mobile_number parameter missing in the incoming request"],
  //     StatusCodes.BAD_REQUEST
  //   );
  //   return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  // } else if (!bodyReq.name) {
  //   ErrorResponse.message = "Something went to wrong";
  //   ErrorResponse.error = new AppError(
  //     ["name parameter missing in the incoming request"],
  //     StatusCodes.BAD_REQUEST
  //   );
  //   return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  // }
  // else if (!bodyReq.email) {
  //   ErrorResponse.message = "Something went to wrong";
  //   ErrorResponse.error = new AppError(
  //     ["Email parameter missing in the incoming request"],
  //     StatusCodes.BAD_REQUEST
  //   );
  //   return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  // } else if (!bodyReq.gender) {
  //   ErrorResponse.message = "Something went to wrong";
  //   ErrorResponse.error = new AppError(
  //     ["gender parameter missing in the incoming request"],
  //     StatusCodes.BAD_REQUEST
  //   );
  //   return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  // } 
  
  // else if (!bodyReq.address) {
  //   ErrorResponse.message = "Something went to wrong";
  //   ErrorResponse.error = new AppError(
  //     ["address parameter missing in the incoming request"],
  //     StatusCodes.BAD_REQUEST
  //   );
  //   return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  // } else if (!bodyReq.pincode) {
  //   ErrorResponse.message = "Something went to wrong";
  //   ErrorResponse.error = new AppError(
  //     ["pincode parameter missing in the incoming request"],
  //     StatusCodes.BAD_REQUEST
  //   );
  //   return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  // }

  next();
}

module.exports = {
  validateCreateUserRequest,
};
