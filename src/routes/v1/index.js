const express = require('express');

const userRoutes = require('./user-routes');
const userRoles = require('./user-roles-routes')

const router = express.Router();

router.get('/',(req,res)=>{res.send("V1 routes api working")})

router.use('/users', userRoutes);
router.use('/user-roles', userRoles);

module.exports = router;