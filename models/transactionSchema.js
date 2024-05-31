const mongoose = require('mongoose');

const transactionhistories= new mongoose.Schema({

    userId:{
        type:String,
        require:true

    },
    debit:{
        type:Number,
        require:true
    },
    credit:{
        type:Number,
        require:true
    }

   
})

const transaction=mongoose.model("transactionhistories",transactionhistories);
module.exports=transaction;