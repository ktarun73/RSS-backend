const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../../utils/common");
const AppError = require("../../utils/errors/app-error");
const {ItemDetailsRepository} = require('../../repositories')
const itemRepo = new ItemDetailsRepository();

async function validateCreateItemDetailRequest(req, res, next) {
    const bodyReq = req.body;
    if (!req.is("application/json")) {
      ErrorResponse.message = "Something went wrong";
      ErrorResponse.error = new AppError(
        ["Content type must be of application/json"],
        StatusCodes.BAD_REQUEST
      );
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    else if (!bodyReq.item_name) {
        ErrorResponse.message = "Something went to wrong";
        ErrorResponse.error = new AppError(
          ["item_name parameter missing in the incoming request"],
          StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
      } 
      else if (!bodyReq.description) {
        ErrorResponse.message = "Something went to wrong";
        ErrorResponse.error = new AppError(
          ["discription parameter missing in the incoming request"],
          StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
      } 
      else if (!bodyReq.item_image) {
        ErrorResponse.message = "Something went to wrong";
        ErrorResponse.error = new AppError(
          ["item_image parameter missing in the incoming request"],
          StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
      } 
      else if (!bodyReq.item_price) {
        ErrorResponse.message = "Something went to wrong";
        ErrorResponse.error = new AppError(
          ["price parameter missing in the incoming request"],
          StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
      } 
      else if (!bodyReq.mgf_Date) {
        ErrorResponse.message = "Something went to wrong";
        ErrorResponse.error = new AppError(
          ["mfg-date parameter missing in the incoming request"],
          StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
      } 
      else if (!bodyReq.exp_Date) {
        ErrorResponse.message = "Something went to wrong";
        ErrorResponse.error = new AppError(
          ["exp-date parameter missing in the incoming request"],
          StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
      } 
      else if (!bodyReq.stock) {
        ErrorResponse.message = "Something went to wrong";
        ErrorResponse.error = new AppError(
          ["stock parameter missing in the incoming request"],
          StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
      } 
      else if (!bodyReq.rating) {
        ErrorResponse.message = "Something went to wrong";
        ErrorResponse.error = new AppError(
          ["rating parameter missing in the incoming request"],
          StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
      } 
      else if (!bodyReq.item_type) {
        ErrorResponse.message = "Something went to wrong";
        ErrorResponse.error = new AppError(
          ["item_type parameter missing in the incoming request"],
          StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
      } 
      next();
}

async function validateUpdateItemDetailRequest(req,res,next){
  const bodyReq = req.body;
  if (!bodyReq.item_name) {
    ErrorResponse.message = "Something went to wrong";
    ErrorResponse.error = new AppError(
      ["item_name parameter missing in the incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  else if (!bodyReq.item_price) {
    ErrorResponse.message = "Something went to wrong";
    ErrorResponse.error = new AppError(
      ["item_price missing in the incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }  
  next();

}

module.exports = {
    validateCreateItemDetailRequest,
    validateUpdateItemDetailRequest
}