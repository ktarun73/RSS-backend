const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const { Auth } = require('../utils/common')
const { UserRepository } = require('../repositories');

const userRepo = new UserRepository();

async function login(data) {
    try {
        const user = await userRepo.getUserByName(data.username);
        if (!user) {
            throw new AppError('Bad credentials', StatusCodes.NOT_FOUND);
        }
        const passwordMatch = Auth.checkPassword(data.password, user.password);
        if (!passwordMatch) {
            throw new AppError('Bad credentials', StatusCodes.BAD_REQUEST);
        }

        const jwt = Auth.createToken({ id: user.id, username: user.username });
        return { 'userid': user.id, 'token': jwt};
    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    login,
}