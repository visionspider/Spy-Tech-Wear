"use strict";
// const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// get all companies from database
const getCompanies = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("ecommerce");
    const result = await db.collection("companies").find().toArray();
    if (result.length) {
      res.status(200).json({
        status: 200,
        data: result,
        message: `get companies succeeded`,
      });
    } else {
      res.status(404).json({ status: 404, message: "companies not found" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};
//get one company with specified _id
const getCompany = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const _id = Number(req.params.companyId);
  console.log(typeof _id);
  try {
    await client.connect();
    const db = client.db("ecommerce");
    const result = await db.collection("companies").findOne({ _id });
    if (result) {
      const arr = [];
      arr.push(result);
      res.status(200).json({
        status: 200,
        data: arr,
        message: " get a company succeeded",
      });
    } else {
      res
        .status(404)
        .json({ status: 404, message: `the company ${_id} is not found` });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};
//update all purchased items
const updateItems = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  // const itemIdQtyArray = req.body;
  const itemIdQtyArray = req.body.data;
  try {
    await client.connect();
    const db = client.db("ecommerce");
    for (let ele of itemIdQtyArray) {
      const result = await db
        .collection("items")
        .findOne({ _id: Number(ele._id) });

      if (result.numInStock < Number(ele.quantity)) {
        throw `the remaining quantity for item  ${ele._id} "${result.name}" is ${result.numInStock} , but required quantity is ${ele.quantity}`;
      }
    }
    for (let ele of itemIdQtyArray) {
      const result = await db
        .collection("items")
        .findOne({ _id: Number(ele._id) });
      await db.collection("items").updateOne(
        { _id: Number(ele._id) },
        {
          $set: { numInStock: result.numInStock - Number(ele.quantity) },
        }
      );
    }

    res.status(200).json({ status: 200, message: "update succeeded" });
  } catch (err) {
    res.status(500).json({
      status: 500,
      data: req.body,
      message: err,
      message2: err.message,
    });
  }
  client.close();
};

//search items base on keyword (case insensitive)
const searchItems = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const keywords = new RegExp(req.query.keywords, "i");
  console.log(typeof keywords);
  try {
    await client.connect();
    const db = client.db("ecommerce");
    const result = await db
      .collection("items")
      .find({
        $or: [
          { name: { $regex: keywords } },
          { body_location: { $regex: keywords } },
          { category: { $regex: keywords } },
        ],
      })
      .toArray();
    if (result.length) {
      res
        .status(200)
        .json({ status: 200, data: result, message: "search succeeded" });
    } else {
      res.status(404).json({
        status: 404,
        data: [req.query.keywords],
        message: `No matched items for ${req.query.keywords}`,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      data: [req.query.keywords],
      message: err.message,
    });
  }
  client.close();
};

//search items for specified category name
const searchCategory = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const category = req.params.categoryName;
  const keyword = new RegExp(category, "i");
  try {
    await client.connect();
    const db = client.db("ecommerce");
    const result = await db
      .collection("items")
      .find({ category: { $regex: keyword } })
      .toArray();
    if (result.length) {
      res
        .status(200)
        .json({ status: 200, data: result, message: "search succeeded" });
    } else {
      res.status(404).json({
        status: 404,
        data: [category],
        message: `No matched items for ${category}`,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      data: [category],
      message: err.message,
    });
  }
  client.close();
};

//search items for specified body location
const searchBodyLocation = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const bodyLocation = req.params.bodyLocation;
  const keyword = new RegExp(bodyLocation, "i");
  try {
    await client.connect();
    const db = client.db("ecommerce");
    const result = await db
      .collection("items")
      .find({ body_location: { $regex: keyword } })
      .toArray();
    if (result.length) {
      res
        .status(200)
        .json({ status: 200, data: result, message: "search succeeded" });
    } else {
      res.status(404).json({
        status: 404,
        data: [bodyLocation],
        message: `No matched items for ${bodyLocation}`,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      data: [bodyLocation],
      message: err.message,
    });
  }
  client.close();
};

module.exports = {
  getCompanies,
  getCompany,
  updateItems,
  searchItems,
  searchCategory,
  searchBodyLocation,
};
