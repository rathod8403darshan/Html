const mongoose = require("mongoose");
const buyproductSchema = require("../models/buyproductSchema.js");
const studentSchema = require("../models/studentSchema");

const fs = require("fs");
const productSchema = require("../models/productSchema.js");
const transaction = require("../models/transactionSchema.js");

const buyproduct = async (req, res) => {
  // console.log(req.body, "body");
  try {
    // console.log(req.body.userId,"userId")
    const user = await studentSchema.findOne({ email: req.body.email });
    // const user = await studentSchema.findOne({ _id: req.body.userId });
    console.log(user, "user buy product");
    if (!user.referPersonId) {
      return res
        .status(200)
        .json({ status: true, message: "You have not refer Person" });
    }

    const referPerson = await studentSchema.findOne({
      studentid: user.referPersonId,
    });
    // const x = await studentSchema.findOne({_id: referPerson._id});
    const product = await productSchema.findOne({ _id: req.body.productId });
    // console.log(product)
    const ref_5 = (product.price * 5) / 100;
    await studentSchema.findOneAndUpdate(
      { _id: referPerson._id },
      { $set: { balance: referPerson.balance + ref_5 } }
    );
    const price = user.balance - product.price;
    if (price < 0) {
      return res
        .status(200)
        .json({ status: false, message: "You have not Enough Balance! " });
    }
    await studentSchema.updateOne(
      { _id: req.body.userId },
      { $set: { balance: user.balance - product.price } }
    );
    // console.log(referPerson)
    // console.log(user, "user")

    // ====================buyproduct=================================================================
    const data = await buyproductSchema.create({
      productId: req.body.productId,
      userId: user._id,
      // userId: req.body.userId
    });

    // ===========================================transaction=========================================================
    await transaction.create({
      userId: referPerson.studentid,
      credit: ref_5,
    });
    await transaction.create({
      userId: user.studentid,
      debit: product.price,
    });
    // console.log(data,"data")
    return res
      .status(200)
      .json({ status: true, data: data, message: " buyproduct successfully1" });
  } catch (error) {
    return res
      .status(200)
      .json({ status: true, data: [], message: "internal server error" });
  }
};

const getAllbuyproduct = async (req, res) => {
  try {
    // const user = await studentSchema.findOne({email:req.body.email});
    // console.log(user, "user");
    const data = await buyproductSchema.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $lookup: {
          from: "students",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$product",
        },
      },
      {
        $unwind: {
          path: "$user",
        },
      },
      {
        $addFields: {
          productname: "$product.productname",
          username: "$user.email",
          image: "$product.image",
        },
      },
      {
        $project: {
          username: 1,
          productname: 1,
          image: 1,
        },
      },
    ]);
    console.log(data, "data");
    return res.status(200).json({
      status: true,
      data: data,
      message: " get buyproduct successfully1",
    });
  } catch (error) {
    console.log(
      error,
      "........................................................."
    );
    return res
      .status(200)
      .json({ status: true, data: [], message: "server internal error!" });
  }
};

const transactionhistories = async (req, res) => {
  try {
    const data = await transaction.aggregate([
      {
        $lookup: {
          from: "students",
          localField: "userId",
          foreignField: "studentid",
          as: "result",
        },
      },
      {
        $unwind: {
          path: "$result",
        },
      },
      {
        $addFields: {
          username: "$result.studentname",
        },
      },
      {
        $project: {
          result: 0,
          _v : 0
        },
      },
    ]);
    return res.status(200).json({
      status: true,
      data: data,
      message: " credit& debit buyproduct successfully1",
    });
  } catch (error) {
    console.log(
      error,
      "........................................................."
    );
    return res
      .status(200)
      .json({ status: true, data: [], message: "server internal error!" });
  }
};

module.exports = {
  buyproduct,
  getAllbuyproduct,
  transactionhistories,
};
