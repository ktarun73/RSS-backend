const CrudRepository = require('../crud-repository');
const { UserRoles } = require('../../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;
class RoleRepository extends CrudRepository {
    constructor() {
        super(UserRoles);
    }
}

module.exports = RoleRepository;