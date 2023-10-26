const CrudRepository = require('../crud-repository');
const { ItemDetails } = require('../../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;
class ItemDetailsRepository extends CrudRepository {
    constructor() {
        super(ItemDetails);
    }

    async ItemDetailsById(id) {
        const itemDetail = await ItemDetails.findOne({ where: { id: id } });
        return itemDetail;
      }
}

module.exports = ItemDetailsRepository;