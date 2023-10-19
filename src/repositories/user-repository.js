const CrudRepository = require('./crud-repository');
const { User } = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;
class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }

    async getUserByName(name){
        const user = await User.findOne({ where: { username: name } });
        return user;        
    }
}

module.exports = UserRepository;