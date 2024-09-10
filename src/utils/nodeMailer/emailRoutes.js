const express = require('express');
const router = express.Router();
const emailController =  require('./emailController')


router.post('/sendEmail', emailController.sendEmail);


module.exports = router; 