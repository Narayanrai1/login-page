const express = require('express');
const router = express.Router();
const path = require('path');
const path1= path.join(__dirname,'..','controllers','authController.js');
// console.log(path1);

const authController = require('../controllers/authController.js');
router.post('/',authController.handleLogin);
module.exports = router;
