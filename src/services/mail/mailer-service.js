const nodemailer = require('nodemailer');
const { ServerConfig } = require("../../config");
const serverConfig = require('../../config/server-config');
let config = {
    service: ServerConfig.MAIL_SERVICE,
    auth: {
        user: ServerConfig.MAIL_AUTH_USER,
        pass: serverConfig.MAIL_AUTH_PASSWORD
    }
}
    
    
let transporter = nodemailer.createTransport(config)



module.exports = {
    transporter,
}
