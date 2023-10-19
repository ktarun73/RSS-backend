const { SuccessResponse, ErrorResponse } = require('../utils/common');
const { StatusCodes } = require('http-status-codes');
const { UserRolesService } = require('../services')

async function getUserRoles(req,res){
    try {
        const response = await UserRolesService.getUserRoles();    
        SuccessResponse.data = response;
        SuccessResponse.message = "Success";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;

        return res.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports = {
    getUserRoles,
    
}