const express = require('express')
const { adddata, getdata, updatedata, deletedata, getonedata } = require('../../controller/productcontroller');
const authorize = require('../../utils/authorize');

const router = express.Router();
const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })

const storage = multer.diskStorage
({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    req.body.image = file.originalname;
    cb(null,file.originalname);
    // let extArray=file.mimetype.split("/");
    // let extension = extArray[extArray.length-1];
  
    // const imagename=file.fieldname+'-'+Date.now()+`.${extension}`
    // req.body={...req.body,imagename}
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
  }

})

const upload = multer({ storage: storage })
router.get('/',getdata)
router.get('/:id',getonedata)
  // =============================================================================
  router.post('/',upload.single('image'),adddata);
//   //  ===============================================================================================
  router.patch('/:id',upload.single('image'),updatedata);
  // authorize(["admin"])


// //    ==========================================================================================
router.delete('/:id',deletedata)
// authorize(["admin"])
module.exports = router