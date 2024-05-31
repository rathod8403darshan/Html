const mongoose = require('mongoose');
const student=new mongoose.Schema({
    email:{
        type: String,
        require:true
    },
    studentname:{
        type: String,
        require:true
    },

    password:{
        type: String,
        require:true
    },
    roll:{

        type:String,
        default:"user"
    },
    otp:{
        type:Number,
        default:123456
    } ,
    balance:{
        type:Number,
        default:500

    },
    studentid:{
        type:String,
        default:"A0"
    },
    referID:{
        type: String,
        default:"6J5OEM"
    },
    referPersonId:{
        type: String,
        default : ""
    },
},
{
    timestamps:true,
    // versionKey:true
}

)

const studenschema=mongoose.model("student",student);
module.exports=studenschema;