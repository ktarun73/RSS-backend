const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../../utils/common");
const AppError = require("../../utils/errors/app-error");
const {UserRepository} = require('../../repositories')
const userRepo = new UserRepository();

async function validateCreateUserDetailRequest(req, res, next) {
    const bodyReq = req.body;
    if (!bodyReq.mobile_number) {
        ErrorResponse.message = "Something went to wrong";
        ErrorResponse.error = new AppError(
          ["mobile_number parameter missing in the incoming request"],
          StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
      }
      else if (!bodyReq.name) {
        ErrorResponse.message = "Something went to wrong";
        ErrorResponse.error = new AppError(
          ["name parameter missing in the incoming request"],
          StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
      }  
      else if (!bodyReq.email) {
        ErrorResponse.message = "Something went to wrong";
        ErrorResponse.error = new AppError(
          ["E-mail parameter missing in the incoming request"],
          StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
      } 
      else if (!bodyReq.gender) {
        ErrorResponse.message = "Something went to wrong";
        ErrorResponse.error = new AppError(
          ["gender parameter missing in the incoming request"],
          StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
      } 
      else if (!bodyReq.address) {
        ErrorResponse.message = "Something went to wrong";
        ErrorResponse.error = new AppError(
          ["address parameter missing in the incoming request"],
          StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
      } 
      else if (!bodyReq.pincode) {
        ErrorResponse.message = "Something went to wrong";
        ErrorResponse.error = new AppError(
          ["pincode parameter missing in the incoming request"],
          StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
      } 
    next();
  }
  
  async function validateUpdateUserDetailRequest(req, res, next) {
    const bodyReq = req.body;
    if (!bodyReq.mobile_number) {
        ErrorResponse.message = "Something went to wrong";
        ErrorResponse.error = new AppError(
          ["mobile_number parameter missing in the incoming request"],
          StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
      }
      else if (!bodyReq.name) {
        ErrorResponse.message = "Something went to wrong";
        ErrorResponse.error = new AppError(
          ["name parameter missing in the incoming request"],
          StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
      }  
      else if (!bodyReq.email) {
        ErrorResponse.message = "Something went to wrong";
        ErrorResponse.error = new AppError(
          ["E-mail parameter missing in the incoming request"],
          StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
      } 
      else if (!bodyReq.gender) {
        ErrorResponse.message = "Something went to wrong";
        ErrorResponse.error = new AppError(
          ["gender parameter missing in the incoming request"],
          StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
      } 
      else if (!bodyReq.address) {
        ErrorResponse.message = "Something went to wrong";
        ErrorResponse.error = new AppError(
          ["address parameter missing in the incoming request"],
          StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
      } 
      else if (!bodyReq.pincode) {
        ErrorResponse.message = "Something went to wrong";
        ErrorResponse.error = new AppError(
          ["pincode parameter missing in the incoming request"],
          StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
      } 
      next();
    }

  module.exports = {
    validateCreateUserDetailRequest,
    validateUpdateUserDetailRequest,
  };
