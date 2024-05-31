const mongoose = require('mongoose');
const productSchema=require('../models/productSchema');
const fs  = require('fs')

const getdata= async (req,res)=>{
        try{

            const getdata=await productSchema.find({});
            // console.log(getdata,"all data")
            // console.log(getdata)
            // const getdata=await productSchema.findOne({_id:new mongoose.Types.ObjectId(req.params.id)});
            // console.log(getdata,"one datafind")

            return res.status(200).json({status:true,productdata:getdata,message:"getdata succesfully"});

        }
        catch(error){
            return res.status(200).json({status:true,productdata:[],message:error.message});
        }
}

const getonedata=async(req,res)=>{
    try{

        // const getdata=await productSchema.find({});
        // console.log(getdata,"all data")
        // console.log(getdata)
        const getdata=await productSchema.findOne({_id:new mongoose.Types.ObjectId(req.params.id)});
        // console.log(getdata,"one datafind")

        return res.status(200).json({status:true,productdata:getdata,message:"getdata one succesfully"});

    }
    catch(error){
        return res.status(200).json({status:true,productdata:[],message:error.message});
    }
}

const adddata= async (req,res)=>{
    console.log(req.body,"req.body");
    try{
        const getiddata=await productSchema.find({});
        // console.log(getdata)
            // const newObj={
            //     ...req.body,
            //     id:getiddata[getiddata.length-1].id?getiddata[getiddata.length-1]+1:getiddata.length+1
            // }

       const adddata=await productSchema.create(req.body);

        return res.status(200).json({status:true,productdata:adddata,message:"adddata succesfully"});

    }
    catch(error){
        return res.status(200).json({status:true,productdata:[],message:"internal server error"});
    }
}


const updatedata= async (req,res)=>{
    try{

        const id=await productSchema.findById(req.params.id);
        console.log(id,"id")
        const path = `public/uploads/${id.image}`;
        console.log(path)
        fs.unlink( path, (err) =>{
            console.log(err)
        } )

        const updatedata=await productSchema.findOneAndUpdate({_id:new mongoose.Types.ObjectId(req.params.id)},{$set:req.body},{new:true});

            console.log(updatedata,"update")

        return res.status(200).json({status:true,productdata:updatedata,message:"updatedata succesfully"});

    }
    catch(error){
        return res.status(200).json({status:true,productdata:[],message:"internal server error"});
    }
}
const deletedata= async (req,res)=>{
    console.log(req.params.id,"delete..........")
    try{
        
        const deletedata=await productSchema.findOneAndDelete({_id:new mongoose.Types.ObjectId(req.params.id)});

        return res.status(200).json({status:true,productdata:deletedata,message:"deletedata succesfully"});

    }
    catch(error){
        return res.status(200).json({status:true,productdata:[],message:"internal server error"});
    }
}

module.exports={
    getdata,
    adddata,
    updatedata,
    deletedata,
    getonedata
}