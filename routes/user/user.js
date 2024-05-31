const express = require('express')
const {getdata, adddata, updatedata, deletedata}=require('../../controller/usercontroller');

const router = express.Router();
// router.get('/:id',getdata)
router.get('/',getdata)
  // =============================================================================


  router.post('/',adddata)
//   //  ===============================================================================================
  router.patch('/:id',updatedata)

// //    ==========================================================================================
router.delete('/:id',deletedata)
module.exports = router