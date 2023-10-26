const express = require("express");
const { ItemDetailsController} = require("../../../controllers");
const { ItemDetailsMiddlewares} = require("../../../middlewares");

const router = express.Router();

router.post('/item',ItemDetailsMiddlewares.validateCreateItemDetailRequest,ItemDetailsController.createItems);
router.post('/:id',ItemDetailsMiddlewares.validateUpdateItemDetailRequest,ItemDetailsController.updateItem);
router.delete('/:id',ItemDetailsController.deleteItem);
router.get('/',ItemDetailsController.getAllItem);
router.get('/:id',ItemDetailsController.getItem);
module.exports = router;