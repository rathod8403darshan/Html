const express = require('express')
const {buyproduct, getAllbuyproduct, transactionhistories} = require('../../controller/buyProductcontroller');
const authorize = require("../../utils/authorize");
const router = express.Router();
// router.get('/:id',getdata)
// router.get('/',getdata)
  // =============================================================================
  router.get('/buy',getAllbuyproduct)
  router.post('/buy',authorize(["user"]),buyproduct)
  router.get('/transaction',transactionhistories)
module.exports = router