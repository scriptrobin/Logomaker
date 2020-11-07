const express = require('express');
const router = express.Router();

const ctrlUser = require('../controller/user.controller');
const jwtHelper = require("../config/jwtHelper");
router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile', jwtHelper.verifyJwtToken ,ctrlUser.userProfile);

/* const ctrlIcons = require('../controller/iconController');
router.get('/getIcons', ctrlIcons.getIcons); */

module.exports = router;