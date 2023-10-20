const { SuccessResponse, ErrorResponse } = require('../../utils/common');
const { StatusCodes } = require('http-status-codes');
const { UserService , UserDetailsService } = require('../../services')

async function login(req, res) {
    try {
        const user = await UserService.login({
            username: req.body.username,
            password: req.body.password
        });
        SuccessResponse.data = user;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}


async function registerUser(req,res){
    try {
        const bodyReq = req.body;
        const bodyData ={
            username: bodyReq.username.trim(),
            password: bodyReq.password,
            role_id: bodyReq.role_id,       
        };
        const register = await UserService.registerUser(bodyData);
        const registeredUserId = register.id;
        const registeredUserData = {
            user_id:registeredUserId,
            mobile_number:bodyReq.mobile_number,
            name:bodyReq.name.trim(),
            email:bodyReq.email.trim(),
            gender:bodyReq.gender.trim(),
            address:bodyReq.address.trim(),
            pincode:bodyReq.pincode
        }
        const registerUserDetails = await UserDetailsService.createUserDetails(registeredUserData);
        const responseData = {
            user : register,
            userDetails: registerUserDetails ,
        }
        SuccessResponse.data = responseData;
        SuccessResponse.message = "register Created Successfully";
        return res.status(StatusCodes.OK).json(SuccessResponse); 
    } 
    catch (error) {
        ErrorResponse.error = error;
        console.log(error);
        return res.status(error.statusCode).json(ErrorResponse);
    }
}


  async function getAllUser(req, res) {
    try {
      const response = await UserService.getAllUser();
      SuccessResponse.data = response;
      SuccessResponse.message = "Success";
      return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
      ErrorResponse.error = error;
  
      return res.status(error.statusCode).json(ErrorResponse);
    }
  }
  
  
module.exports = {
    login,
    registerUser,
    getAllUser,
   
}