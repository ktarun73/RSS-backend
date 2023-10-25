const CrudRepository = require('../crud-repository');
const { UserDetails } = require('../../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;
class ItemDetailsRepository extends CrudRepository {
    constructor() {
        super(ItemDetails);
    }

    
}

module.exports = ItemDetailsRepository;