const { StatusCodes } = require('http-status-codes');

const { Logger } = require('../config');
const AppError = require('../utils/errors/app-error');

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            const response = await this.model.create(data);
            return response;   
        } catch (error) {
            throw error;
        }
    }

    async createBulk(data) {
        const response = await this.model.bulkCreate(data);
        return response;
    }

    async destroy(data) {
        const response = await this.model.destroy({
            where: {
                id: data
            }
        });
        if(!response) {
            throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND);
        }
        return response;
    }

    async get(data) {
        const response = await this.model.findByPk(data);
        if(!response) {
            throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND);
        }
        return response;
    }

    async getAll(offset, limit, order_arr = []) {
        
        const params = {
            order: order_arr,
            raw: true
        };
        if(offset) params.offset = offset;
        if(limit) params.limit = limit;

        const response = await this.model.findAll(params);
        
        return response;
    }

    async update(id, data) { // data -> {col: value, ....}
        
        const record = await this.get(id);
        if(!record){
            throw new AppError('Not able to find or update the resource', StatusCodes.NOT_FOUND);
        }
        
        const response = await this.model.update(data, {
            where: {
                id: id
            }
        });
        //Update returns an array with its first element as the no. of rows affected
        return response;
    }

    async countAll(){

        const count = await this.model.count();
        return count;

    }

}

module.exports = CrudRepository;