const CrudRepository = require('../crud-repository');
const { UserDetails } = require('../../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;
class UserRepository extends CrudRepository {
    constructor() {
        super(UserDetails);
    }
}

module.exports = UserRepository;