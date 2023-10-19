const express = require('express');
const { UserRolesController } = require('../../controllers')

const router = express.Router();

router.get('/',UserRolesController.getUserRoles);


module.exports = router;