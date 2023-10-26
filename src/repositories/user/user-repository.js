const CrudRepository = require('../crud-repository');
const { User } = require('../../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;
class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }

    async getUserByUserName(username){
        const user = await User.findOne({ where: { username: username } });
        return user;        
    }
    async getUserByEmail(email) {
        const user = await User.findOne({ where: { email: email } });
        return user;
    }
    async getUserById(id) {
        const user = await User.findOne({ where: { id:id } });
        return user;
    }
}

module.exports = UserRepository;