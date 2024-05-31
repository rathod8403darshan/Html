var jwt = require('jsonwebtoken');

const studentSchema = require("../models/studentSchema");
var nodemailer = require('nodemailer');
const mongoose = require("mongoose");
const { number } = require('joi');
const studenschema = require('../models/studentSchema');
let roll;

const signup = async (req, res) => {
  try {
    let finduser = await studentSchema.findOne({ email: req.body.email });
    // console.log("req.body.email",req.body)
    // console.log("finduser",req.body)

    const referperson = await studenschema.findOne({referID: req.body.
      referPersonId})
      // console.log(referperson.studentid,"referperson");
    if (finduser) {
      return res
        .status(200)
        .json({
          status: false,
          studentData: [],
          message: "user already exists",
        });
    }
    
    // if (req.body.password !== req.body.confirmpassword) {
    //   return res
    //     .status(200)
    //     .json({
    //       status: false,
    //       studentData: [],
    //       message: "password and comfirmpassword not match!",
    //     });
    // }
    // ====================================referid===========================================
    function generateReferID() {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let referID = '';
      for (let i = 0; i < 6; i++) {
          referID += characters.charAt(Math.floor(Math.random() * characters.length));
      }
  
      return referID;
  }
  const uniqueReferID = generateReferID();
  // console.log(uniqueReferID);

  
  // =====================roll========================
  const  data=await studentSchema.find({});
  const newId = data.length > 0 ? Number(data[data.length - 1].studentid.slice(1)) + 1 : 1;
  const roll=data.length===0 ?'admin':"user"; 

  // referPersonId:referperson.studentid
  // referPersonId:referperson.studentid
  
    const x = await studentSchema.create({...req.body,roll,referID:uniqueReferID,studentid:`A${newId}`, referPersonId: referperson ? referperson.studentid: ""});
    return res
      .status(200)
      .json({ status: true, studentData: x, message: "singup successfully" });
  } catch (error) {
    return res
      .status(200)
      .json({ status: false, studentData: [], message: error.message });
  }
};
//    =======================login================================================================

const login = async (req, res) => {
  try {
  
    let finduser = await studentSchema.findOne({ email: req.body.email });

    // let x=studentData.find(y => y.id== req.params.id);
    if (!finduser) {
      return res
        .status(200)
        .json({ status: false, studentData: [], message: "user not found" });
    }
    if (req.body.password !== finduser.password) {
      return res
        .status(200)
        .json({
          status: false,
          studentData: [],
          message: "incorrect email and password!",
        });
    }
    //   const x= await studentSchema.create(req.body);
    var token = jwt.sign({ email:finduser.email ,roll:finduser.roll}, 'privatekey');
    // console.log(token);
    return res
      .status(200)
      .json({
        status: true,
        studentData: finduser,token,
        message: "login successfully",
      });
  } catch (error) {
    return res
      .status(200)
      .json({ status: true, studentData: [], message: "internal error" });
  }
};
//    =============================================email verification=====================================

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rajmaanjewels7171@gmail.com',
    pass: 'lzie tazx nxrd mrvx'
  }
});

// var mailOptions = {
//   from: 'rajmaanjewels7171@gmail.com',
//   to: 'rajmaanjewels7171@gmail.com',
//   subject: 'Sending Email using Node.js',
//   text: `${otp}`
// };
const emailverification = async (req, res) => {
  try {
    let finduser = await studentSchema.findOne({ email: req.body.email });
    // console.log(finduser,"user")
    if (!finduser) {
      return res
        .status(200)
        .json({ status: false, studentData: [], message: "user not found" });
    }

    const otp= Math.floor(100000 + Math.random() * 900000);
    console.log(otp,"otp==========================");
    
    const updatestudent= await studentSchema.findOneAndUpdate({email:req.body.email},{$set:{otp:otp}},{new:true})
    var mailOptions = {
      from: 'rajmaanjewels7171@gmail.com',
      to: 'rajmaanjewels7171@gmail.com',
      subject: 'Sending Email using Node.js',
      text: `${otp}`
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    return res
      .status(200)
      .json({
        status: true,
        studentData: updatestudent,
        message: "email verified successfully",
      });
  } catch (error) {
    return res
      .status(200)
      .json({ status: true, studentData: [], message: "internal error" });
  }
};
const otpverification = async (req, res) => {
  try {
    let finduser = await studentSchema.findOne({ email: req.body.email });
    console.log(finduser.otp,"finduser")
    // console.log(Number(req.body.otp),"bodyotp")
    if (!finduser) {
      return res
        .status(200)
        .json({ status: false, studentData: [], message: "user not found" });
    }
    if(Number(req.body.otp )!== finduser.otp){
      return res
        .status(200)
        .json({ status: false, studentData: [], message: "otp not verified!!" });
    }
    return res
      .status(200)
      .json({
        status: true,
        studentData: finduser,
        message: "otp verified successfully",
      });
  } catch (error) {
    return res
      .status(200)
      .json({ status: true, studentData: [], message: "internal error" });
  }
};
//    ===========================================================forgote password=============================
const forgotepassword = async (req, res) => {
  try {
    let finduser = await studentSchema.findOne({ email: req.body.email });
    console.log(finduser,"heeeloo")
    if (!finduser) {
      return res
        .status(200)
        .json({ status: false, studentData: [], message: "user not found" });
    }
    // if (req.body.password !== finduser.password) {
    //   return res
    //     .status(200)
    //     .json({
    //       status: false,
    //       studentData: [],
    //       message: "password and comfirmpassword not match!",
    //     });
    // }
    const studentData = await studentSchema.findByIdAndUpdate(
      { _id: finduser._id },
      { $set: { password: req.body.password } }
    );
    return res
      .status(200)
      .json({
        status: true,
        studentData: finduser,
        message: "password changed successfully",
      });
  } catch (error) {
    return res
      .status(200)
      .json({ status: true, studentData: [], message: "internal error" });
  }
};
module.exports = {
  signup,
  login,
  emailverification,
  forgotepassword,
  otpverification
};
