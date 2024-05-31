
const studentSchema=require('../models/studentSchema')

const mongoose = require('mongoose');
const getdata= async (req, res) => {
 
      try{   
       
    // let x=studentData.find(y => y.id== req.params.id);
    let getdata=await studentSchema.find({});
           return  res.status(200).json({status:true,studentData:getdata,message:"get data is successfully1"})
      }
      catch(error){
        return res.status(200).json({status:true,studentData:[],message:"server internal error!"})
      }
  }

  const adddata = async (req, res) => {
 
    try{   
      
        let getdata1= await studentSchema.find({});

      // const newObj={
      //   ...req.body,
      //   userId:getdata1[getdata1.length-1].userId? getdata1[getdata1.length-1]+1:getdata1.length+1
  
      // }
      // console.log(userId,"id")
      // let x=studentData.find(y => y.id== req.params.id);

      const newId = getdata1.length > 0 ? Number(getdata1[getdata1.length - 1].studentid.slice(1)) + 1 : 1;
 const adddata=await studentSchema.create({...req.body,studentid:`A${newId}`});
             return  res.status(200).json({status:true,studentData:adddata,message:"add data is successfully1"})
        }
        catch(error){
          return res.status(200).json({status:true,studentData:[],message:error.message})
        }
   }


   const updatedata= async (req, res) => {
  try{     
    // let x=studentData.find(y => y.id== req.params.id);
    const updatedata= await studentSchema.findOneAndUpdate({_id: new mongoose.Types.ObjectId(req.params.id)},{$set:req.body},{new:true})
           return  res.status(200).json({status:true,studentData:updatedata,message:"update data is successfully1"})
      }
      catch(error){
        return res.status(200).json({status:true,studentData:[],message:"server internal error!"})
      }
   }




   const deletedata=async (req, res) => {
    try{     
      const deletedata= await studentSchema.findByIdAndDelete({_id: new mongoose.Types.ObjectId(req.params.id)})
             return  res.status(200).json({status:true,studentData:deletedata,message:"delete data is successfully1"})
        }
        catch(error){
          return res.status(200).json({status:true,studentData:[],message:"server internal error!"})
        }
   }

   module.exports = {


    getdata,
    adddata,
    updatedata,
    deletedata
   }