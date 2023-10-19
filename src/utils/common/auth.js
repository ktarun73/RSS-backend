const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { ServerConfig } = require('../../config');
function checkPassword(plainPassword, encryptedPassword) {
    try {
        return bcrypt.compareSync(plainPassword, encryptedPassword);
    } catch(error) {
        throw error;
    }
}

function createToken(input) {
    try {
        return jwt.sign(input, ServerConfig.JWT_SECRET, {expiresIn: ServerConfig.JWT_EXPIRY}); 
    } catch(error) {
        throw error;
    }
}

function verifyToken(token) {
    try {
        return jwt.verify(token, ServerConfig.JWT_SECRET);
    } catch(error) {
        if(error.name == 'TokenExpiredError') {
            const decoded = jwt.decode(token, {complete: true});
            return decoded.payload;
        }
        throw error;
    }
}

function refreshToken(token){

    try {
        const decoded = jwt.decode(token, {complete: true});
        return createToken(decoded.payload);
    } catch (error) {
        throw error;
    }

}

module.exports = {
    checkPassword,
    createToken,
    verifyToken,
    refreshToken
}