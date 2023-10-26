const CrudRepository = require('../crud-repository');
const { Otp } = require('../../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;
class OTPRepository extends CrudRepository {
    constructor() {
        super(Otp);
    }

    async findOtp(data){
        const otp = await Otp.findOne({ where: { otp: data.otp , user_id: data.user_id} });
        return otp;
    }
}

module.exports = OTPRepository;