const mongoose = require('mongoose');
const userSchema=require('../models/userSchema');


const getdata= async (req,res)=>{
        try{

            const getdata=await userSchema.find();
            // console.log(getdata)
            // const getdata=await userSchema.findOne({_id:new mongoose.Types.ObjectId(req.params.id)});
            // console.log(getdata,"one datafind")

            return res.status(200).json({status:true,userdata:getdata,message:"getdata succesfully"});

        }
        catch(error){
            return res.status(200).json({status:true,userdata:[],message:"internal server error"});
        }
}

const adddata= async (req,res)=>{
    try{

        const getiddata=await userSchema.find({});
        // console.log(getdata)
            // const newObj={
            //     ...req.body,
            //     userid:getiddata[getiddata.length-1].id?getiddata[getiddata.length-1]+1:getiddata.length+1
            // }
            // const newId = getiddata.length > 0 ? Number(getiddata[getiddata.length - 1].userid.slice(1)) + 1 : 1;
            // console.log(`A${newId}`,,userid:`A${newId}`)
       const adddata=await userSchema.create(req.body);

        return res.status(200).json({status:true,userdata:adddata,message:"adddata succesfully"});

    }
    catch(error){
        return res.status(200).json({status:true,userdata:[],message:error.message});
    }
}


const updatedata= async (req,res)=>{
    try{

        // const getdata=await userSchema.find();
        // console.log(getdata)
        const updatedata=await userSchema.findOneAndUpdate({_id:new mongoose.Types.ObjectId(req.params.id)},{$set:req.body},{new:true});
    

        return res.status(200).json({status:true,userdata:updatedata,message:"updatedata succesfully"});

    }
    catch(error){
        return res.status(200).json({status:true,userdata:[],message:"internal server error"});
    }
}
const deletedata= async (req,res)=>{
    try{

        const deletedata=await userSchema.findOneAndDelete({_id:new mongoose.Types.ObjectId(req.params.id)});

        return res.status(200).json({status:true,userdata:deletedata,message:"deletedata succesfully"});

    }
    catch(error){
        return res.status(200).json({status:true,userdata:[],message:"internal server error"});
    }
}

module.exports={

    getdata,
    adddata,
    updatedata,
    deletedata
}