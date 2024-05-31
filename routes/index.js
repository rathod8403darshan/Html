const express = require('express')
const router = express.Router();

const studentdata=require('./student/student');
const userdata=require('./user/user');
const auth=require('./auth/authindex');
const productdata=require("./product/product");
// const authorize = require('../utils/authorize');
const buyproduct = require('./buyproduct/buyproduct');


// authorize(["admin"])
router.use('/student',studentdata);
router.use('/product',productdata);

router.use('/',auth);
router.use('/user',userdata);
router.use('/',buyproduct)
// authorize(["admin"])
module.exports = router
