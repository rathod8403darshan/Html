const mongoose = require('mongoose');

const product_Obj=new mongoose.Schema({

    
    

    productname:{
        type:String,
        require:true
    },
    categori:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    stock:{
        type:String,
        require:true
    },
    roll:{
        type:String,
        default:"user"
      
    },
    image:{
        type:String,
        require:true
    }

})

const productSchema=mongoose.model("product",product_Obj);
module.exports=productSchema;