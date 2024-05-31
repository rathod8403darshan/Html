const express = require('express');
const { signup, login, emailverification, forgotepassword, otpverification } = require('../../controller/authcontroller');
const { validate } = require('../../utils/validate');
// console.log(login,"login")


const router = express.Router();
// router.post('/signup',signup)
  // =============================================================================
  // ,

  // validate("singupSchema")

  router.post('/singup',signup)
  router.post('/login',login)
  router.post('/emailverification',emailverification)
  router.post('/otpverification',otpverification)
  router.post('/forgotepassword', forgotepassword)
//   //  ===============================================================================================
//   router.patch('/:id',updatedata)

// //    ==========================================================================================
// router.delete('/:id',deletedata)
module.exports = router