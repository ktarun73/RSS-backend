const{ SuccessResponse, ErrorResponse } = require('../../utils/common');
const { StatusCodes } = require('http-status-codes');
const {  ItemService } = require('../../services');

async function createItems(req,res){
    try {
      const bodyReq = req.body;
      const bodyData = {
       
        id:bodyReq.id,
       item_name: bodyReq.item_name.trim(),
       description: bodyReq.description.trim(),
       item_image: bodyReq.item_image.trim(),
       item_price: bodyReq.item_price,
       mgf_Date: new Date(bodyReq.mgf_Date),
       exp_Date: new Date (bodyReq.exp_Date),
       stock: bodyReq.stock,
       rating: bodyReq.rating,
       item_type: bodyReq.item_type.trim(),
      };
  
    
      const items = await ItemService.createItem(bodyData);
     
  
      SuccessResponse.data = items;
      SuccessResponse.message = "item deatils Created Successfully";
  
      return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
      
      ErrorResponse.error = error;
      console.log(error);
      return res.status(error.statusCode).json(ErrorResponse);
    }

  }

  

  async function updateItem(req, res) {
    try {
      const bodyReq = req.body;
      const bodyData = {
        
        item_name: bodyReq.item_name.trim(),
        item_price: bodyReq.item_price,
      };
  
      
  
      const item = await ItemService.updateItem(req.params.id, bodyData);
      SuccessResponse.data = item;
      SuccessResponse.message = "Item details Updated Successfully";
  
      return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
  }

  async function deleteItem(req,res){
    try {
      const item = await ItemService.deleteItem(req.params.id);
      SuccessResponse.data = item;
      SuccessResponse.message = "Item details Deleted Successfully";
  
      return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
      console.log(error);
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }

  }
  async function getAllItem(req, res) {
    try {
      const response = await ItemService.getAllItem();
      SuccessResponse.data = response;
      SuccessResponse.message = "Success";
      return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
      ErrorResponse.error = error;
  
      return res.status(error.statusCode).json(ErrorResponse);
    }
  }

  async function getItem(req, res) {
    try {
      const id = Number(req.params.id);
      
  
      const response = await ItemService.getItem(id);
     
      SuccessResponse.data = response;
      SuccessResponse.message = "Success";
      return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
  }
  
module.exports = {
    createItems,
    updateItem,
    deleteItem,
    getAllItem,
    getItem,
}