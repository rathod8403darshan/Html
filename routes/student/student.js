const express = require('express')
const {getdata,adddata,updatedata,deletedata}=require('../../controller/studentController');
const authorize = require('../../utils/authorize');
const router = express.Router();
// router.get('/:id',getdata)

router.get('/',getdata)
  // =============================================================================


  router.post('/',authorize(["user"]),adddata)
  //  ===============================================================================================
  router.patch('/:id',updatedata)

//    ==========================================================================================
router.delete('/:id',deletedata)
module.exports = router