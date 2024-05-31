const mongoose = require('mongoose');

const user_obj= new mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    standard:{
        type:Number,
        require:true
    },
    role_no:{
        type:Number,
        require:true
    },
    marks:{
        type:Number,
        require:true
    },
    gender:{
        type:String,
        require:true
    }
    
})

const userSchema=mongoose.model("user",user_obj);
module.exports=userSchema;