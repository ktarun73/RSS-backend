const { SuccessResponse, ErrorResponse } = require('../../utils/common');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../../utils/errors/app-error');
const { UserService , UserDetailsService , MailerService, OTPService } = require('../../services')

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
            password: bodyReq.password.trim(),
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

        const mailBody = {
            username: bodyData.username,
            password: bodyData.password,
            name: registeredUserData.name,
            mobile_number:registeredUserData.mobile_number,
            email: registeredUserData.email,
            gender: registeredUserData.gender,
            address: registeredUserData.address,
            pincode: registeredUserData.pincode
        }

        let message = {
            from: 'ktarun2500@gmail.com',
            to: bodyReq.email,
            subject: "Registration successful, Your details are here!",
            html: '<b>' + JSON.stringify(mailBody) + '</b>'
            }
    
         MailerService.transporter.sendMail(message);
        

     
        SuccessResponse.data = responseData;
        SuccessResponse.message = "User registered";
        return res.status(StatusCodes.OK).json(SuccessResponse); 
    } 
    catch (error) {
        ErrorResponse.error = error;
        console.log(error);
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function updateUser(req, res) {
    try {   
      const bodyReq = req.body;
      const bodyData = {
        password:bodyReq.password
      };
      const update = await UserService.updateUser(req.params.id, bodyData);
      const updateUserData = {
            mobile_number:bodyReq.mobile_number,
            name:bodyReq.name.trim(),
            email:bodyReq.email.trim(),
            gender:bodyReq.gender.trim(),
            address:bodyReq.address.trim(),
            pincode:bodyReq.pincode,
      }
      const userData = await UserDetailsService.getUserDetailsByUserId(req.params.id);
      const updateUserDetails = await UserDetailsService.updateUserDetails(userData.id,updateUserData);
        const responseData = {
            user : update,
            userDetails: updateUserDetails
        }
      SuccessResponse.data = responseData;
      SuccessResponse.message = "User Updated Successfully";
      return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
      ErrorResponse.error = error;
      console.log(error);
      return res.status(error.statusCode).json(ErrorResponse);
    }
}


  async function  deleteUser(req,res){
    try {
        const userId = req.params.id;
        const userData = await UserDetailsService.getUserDetailsByUserId(userId);
        if(userData){
            await UserDetailsService.deleteUserDetails(userData.id);
        }
        const deleteUser = await UserService.deleteUser(userId);
        SuccessResponse.data = deleteUser;
        SuccessResponse.message = "User and user details deleted successfully";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
        
    }
  }
  




  async function getAllUsers(req, res) {
    try {
      
      const allUsers = await UserService.getAllUser();
      const usersAndDetails = [];
      for (const user of allUsers) {
        const userDetails = await UserDetailsService.getUserDetailsByUserId(user.id);
        if (userDetails) {
          usersAndDetails.push({
            user: user,
            details: userDetails,
          });
        }
      }
  
      SuccessResponse.data = usersAndDetails;
      SuccessResponse.message = "All users and their details retrieved successfully";
      return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
      ErrorResponse.error = error;
      console.error(error);
      return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
  }
  



  async function getUsers(req, res) {
    try {
      const userId = req.params.id;
      const user = await UserService.getUser(userId);
      const userDetails = await UserDetailsService.getUserDetailsByUserId(userId);
      if (!user) {
        throw new AppError("User not found", StatusCodes.NOT_FOUND);
      }
      SuccessResponse.data = {
        user: user,
        details: userDetails,
      };
      SuccessResponse.message = "User and user details retrieved successfully";
      return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
      ErrorResponse.error = error;
      console.error(error);
      return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
  }


  
  async function forgotPassword(req, res) {
    try { 
      const username = req.body.username;
      const user = await UserService.getUserByUsername(username);
      if(!user){
        throw new AppError("User not found", StatusCodes.NOT_FOUND);
      }
      const userDetails = await UserDetailsService.getUserDetailsByUserId(user.id);
      const email = userDetails.email;
      const generateOtp = await OTPService.generateOtp(user.id);
      const otp = generateOtp.otp;
      let message = {
        from: 'ktarun2500@gmail.com',
        to: email,
        subject: "Your OTP for password reset is here!",
        html: `<html>
                  <body>
                    <h1>Password Reset OTP</h1>
                    <p>Hello,</p>
                    <p>Your OTP for resetting your password is: <strong>${otp}</strong></p>
                    <p>Please enter this OTP on the password reset page to proceed.</p>
                    <p>If you didn't request this password reset, please ignore this email.</p>
                    <p>Thank you!</p>
                  </body>
                </html>`
      } 
      MailerService.transporter.sendMail(message);
      SuccessResponse.message = "OTP sent to your registered email";
      return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
      ErrorResponse.error = error;
      console.log(error);
      return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function verifyOtp(req, res) {
  try {
    const data = {
      otp: req.body.otp,
      user_id: req.body.id
    }
    const otp = await OTPService.getOtp(data);
    const currentTime = new Date();
    if(currentTime > otp.expiration_time){
      await OTPService.deleteOtp(otp.id);
      throw new AppError('OTP expired , Please generate new' , StatusCodes.GONE);
    }
    const verifyOtp = await OTPService.verifyOtp(otp);
    if(!verifyOtp){
      await OTPService.deleteOtp(otp.id);
      throw new AppError('Something went wrong', StatusCodes.NOT_FOUND);
    }
    SuccessResponse.message = "OTP verified Successfully";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    console.log(error);
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function resetPassword(req, res) {
  try {
    const password = req.body.password;
    const userId = req.body.user_id;
    const otp = req.body.otp;
    const isOtpVerified = await OTPService.isVerified({otp: otp , user_id:userId});
    if(!isOtpVerified){
      throw new AppError("Please try again or generate a new OTP",StatusCodes.BAD_REQUEST)
    }
    
    const updatePassword = await UserService.updateUser(userId,{password:password})
    SuccessResponse.data = updatePassword;
    SuccessResponse.message = "Password Changed successfully";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    console.log(error);
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
  
  
  

module.exports = {
    login,
    registerUser,
    getAllUsers,
    updateUser,
    deleteUser,
    getUsers,
    forgotPassword,
    verifyOtp,
    resetPassword
  
}