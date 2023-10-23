const CrudRepository = require('../crud-repository');
const { UserDetails } = require('../../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;
class UserDetailsRepository extends CrudRepository {
    constructor() {
        super(UserDetails);
    }

    async getUserDetails(user_id) {
        const userDetails = await UserDetails.findOne({ where: { user_id: user_id } });
        return userDetails;
    }
}

module.exports = UserDetailsRepository;