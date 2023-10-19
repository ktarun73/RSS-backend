const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

const { UserRolesRepository } = require('../repositories');

const userRolesRepo = new UserRolesRepository();

async function getUserRoles(){
    try {
        const response = await userRolesRepo.getAll();
        return response;    
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError(
            "Something went wrong",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

module.exports = {
    getUserRoles,
    
}