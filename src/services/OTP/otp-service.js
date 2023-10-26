const { StatusCodes } = require('http-status-codes');
const {ServerConfig} = require('../../config')
const AppError = require('../../utils/errors/app-error');
const { Auth } = require('../../utils/common')
const { OTPRepository } = require('../../repositories');
const otpRepo = new OTPRepository();


// Function to generate a random six-digit number
function generateSixDigitRandomNumber() {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function generateOtp(userId) {
    try {
        const otp = generateSixDigitRandomNumber();
        const data = {
            otp: otp,
            user_id: userId
        }
        await otpRepo.create(data);
        return data;
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
        "Cannot create the otp object",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
  

  async function verifyOtp(otp) {
    try {
        const verify = await otpRepo.update(otp.id , {verified: 1})
        return verify;
    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function isVerified(data) {
  try {
      const otp = await otpRepo.findOtp(data);
      if(!otp){
          return false;
      }
      const isVerified = otp.verified;
      if(isVerified){
        otpRepo.destroy(otp.id);
      }
      return isVerified;
  } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function deleteOtp(data) {
  try {
    await otpRepo.destroy(data)
  } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getOtp(data) {
  try {
      const otp = await otpRepo.findOtp(data);
      if(!otp){
        throw new AppError('OTP not found , please try again', StatusCodes.NOT_FOUND);
      }
      return otp;
  } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}



module.exports = {
    generateOtp,
    verifyOtp,
    isVerified,
    deleteOtp,
    getOtp
}