const mongoose = require('mongoose');

const buyproduct=new mongoose.Schema({
    // mongoose.Types.ObjectId
    productId:{
        type:mongoose.Types.ObjectId,
        require:true
    },
    userId:{
        type: mongoose.Types.ObjectId,
        require:true
    }

})

const buyproductSchema=mongoose.model("buyproduct",buyproduct);
module.exports=buyproductSchema;