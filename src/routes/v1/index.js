const express = require('express');

const userRoutes = require('././user/user-routes');
const userRoles = require('./user roles/user-roles-routes')
const itemRoutes = require('./item/item-routes')
 
const router = express.Router();

router.get('/',(req,res)=>{res.send("V1 routes api working")})

router.use('/users', userRoutes);
router.use('/user-roles', userRoles);
router.use('/items', itemRoutes);

module.exports = router;