const { StatusCodes } = require('http-status-codes');
const AppError = require('../../utils/errors/app-error');
const { ItemDetailsRepository } = require('../../repositories');

const itemDetailsRepo = new ItemDetailsRepository();

async function createItem(data) {
    try {
      
      const itemDetails = await itemDetailsRepo.create(data);
      return itemDetails;
    } catch (error) {
      console.log(error.name, error.message);
      if (error.name == "SequelizeValidationError") {
        let explanation = [];
        error.errors.forEach((err) => {
          explanation.push(err.message);
        });
       
        throw new AppError(explanation, StatusCodes.BAD_REQUEST);
      } else if (error.name == "SequelizeForeignKeyConstraintError") {
        throw new AppError(error.message, StatusCodes.BAD_REQUEST);
      } else if (error.name == "SequelizeUniqueConstraintError") {
        throw new AppError(error.message, StatusCodes.BAD_REQUEST);
      } else if (error.statusCode == StatusCodes.NOT_FOUND) {
        throw new AppError(error.message, StatusCodes.NOT_FOUND);
      }
      throw new AppError(
        "Cannot create the items details object",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
    async function updateItem(id, data) {
      try {
        const item= await itemDetailsRepo.update(id, data);
        return item;
      } catch (error) {
        if (error.name == "SequelizeValidationError") {
          let explanation = [];
          error.errors.forEach((err) => {
            explanation.push(err.message);
          });
          throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        } else if (error.name == "SequelizeForeignKeyConstraintError") {
          throw new AppError(error.message, StatusCodes.BAD_REQUEST);
        } else if (error.statusCode == StatusCodes.NOT_FOUND) {
          throw new AppError(error.message, StatusCodes.NOT_FOUND);
        }
        throw new AppError(
          "Cannot update the item-details object",
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }
    }
  
    async function deleteItem(id) {
      try {
        const agent = await itemDetailsRepo.destroy(id);
        return agent;
      } catch (error) {
        if (error.name == "SequelizeValidationError") {
          let explanation = [];
          error.errors.forEach((err) => {
            explanation.push(err.message);
          });
          throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        } else if (error.name == "SequelizeForeignKeyConstraintError") {
          throw new AppError(error.message, StatusCodes.BAD_REQUEST);
        } else if (error.statusCode == StatusCodes.NOT_FOUND) {
          throw new AppError(error.message, StatusCodes.NOT_FOUND);
        }
        throw new AppError(
          "Cannot delete the item details object",
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }
    }
    async function getAllItem(req, res) {
      try {
        const item = await itemDetailsRepo.getAll();
        return item;
      } catch (error) {
        console.log(error);
        throw new AppError(
          "Cannot get all item details objects",
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }
    }

    async function getItem(id) {
      try {
        const count = await itemDetailsRepo.get(id);
    
        return count;
      } catch (error) {
        if (error instanceof AppError) {
          throw error;
        }
    
        throw new AppError(
          "Something went wrong",
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }
    }

  module.exports ={
    createItem,
    updateItem,
    deleteItem,
    getAllItem,
    getItem
    
  }