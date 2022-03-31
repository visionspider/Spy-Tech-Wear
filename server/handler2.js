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
  const itemIdQtyArray = req.body;
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
module.exports = { getCompanies, getCompany, updateItems };
