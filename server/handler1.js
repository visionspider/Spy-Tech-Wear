"use strict";

// uses package to generate _id
const { v4: uuidv4 } = require("uuid");

// Mongo db dependencies
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const DB_NAME = "ecommerce";
const Company_Collection = "companies";
const Items_Collection = "items";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const client = new MongoClient(MONGO_URI, options);
// How many results per page for .get(item)
const itemsPerPage = 25;

// Function to get all of the items inside the database
const getItems = async (req, res) => {
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    let listOfItems = await db.collection(Items_Collection).find().toArray();
    res.status(200).json({
      status: 200,
      data: listOfItems,
      message: "Items retrieved succesfully",
    });
  } catch {
    res.status(500).json({
      status: 500,
      message: "The server is currently unable to handle this request.",
    });
  } finally {
    // Close connection
    client.close();
  }
};

// Function to return 25 items per page
const get25Items = async (req, res) => {
  const { page } = req.params;
  // Make sure that page is a number
  if (isNaN(parseInt(page))) {
    return res.status(400).json({
      status: 400,
      message: "The page number entered is not a number",
    });
  }
  // If the page number entered is negative || is 0
  else if (parseInt(page) <= 0) {
    return res.status(400).json({
      status: 400,
      message: "The page number entered is not valid",
    });
  }
  // All test requirements passed, proceed with the request
  else {
    try {
      await client.connect();
      const db = client.db(DB_NAME);
      const maxNumberOfPage = Math.ceil(
        (await db.collection(Items_Collection).estimatedDocumentCount()) /
          itemsPerPage
      );
      // Check if the page requested is valid
      if (page <= maxNumberOfPage) {
        const listOfItems = await db
          .collection(Items_Collection)
          .find()
          .sort({ _id: 1 })
          .limit(itemsPerPage)
          // No one goes to page 0 -> need to offset by 1
          .skip((parseInt(page) - 1) * itemsPerPage)
          .toArray();

        res.status(200).json({
          status: 200,
          data: listOfItems,
          message: "Items retrieved succesfully",
        });
      } else {
        res.status(400).json({
          status: 400,
          message: "The page number entered is not valid",
        });
      }
    } catch {
      res.status(500).json({
        status: 500,
        message: "The server is currently unable to handle this request.",
      });
    } finally {
      // Close connection
      client.close();
    }
  }
};

// Function to know how many pages the frontend needs to display
const getPagination = async (req, res) => {
  try {
    await client.connect();
    const db = client.db(DB_NAME);

    const numberOfProducts = await db
      .collection(Items_Collection)
      .estimatedDocumentCount();
    // Round number up because pages are whole numbers
    const numberOfPage = Math.ceil((await numberOfProducts) / itemsPerPage);

    res.status(200).json({
      status: 200,
      data: [
        {
          itemsPerPage: itemsPerPage,
          numberOfPage: numberOfPage,
          numberOfProducts: numberOfProducts,
        },
      ],
      message: "Items retrieved succesfully",
    });
  } catch {
    res.status(500).json({
      status: 500,
      message: "The server is currently unable to handle this request.",
    });
  } finally {
    // Close connection
    client.close();
  }
};

// Function to get one item inside the database
const getItem = async (req, res) => {
  const { itemId } = req.params;
  const query = { _id: parseInt(itemId) };
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    let item = await db.collection(Items_Collection).find(query).toArray();
    if (item.length) {
      res.status(200).json({
        status: 200,
        data: item,
        message: "Item retrieved succesfully",
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Item with that ID does not exist",
      });
    }
  } catch {
    res.status(500).json({
      status: 500,
      message: "The server is currently unable to handle this request.",
    });
  } finally {
    // Close connection
    client.close();
  }
};

// Function to update database items after purchase
// Receiving information from Form array of objects -> |quantity|id
const updateItemsNathan = async (req, res) => {
  const receivedData = req.body;
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    //========================== Body MUST be an array ==========================//
    if (Array.isArray(receivedData)) {
      //========================== Only received 1 item inside cart ==========================//
      if (receivedData.length === 1) {
        const query = { _id: receivedData[0]._id };
        let selectedItem = await db
          .collection(Items_Collection)
          .find(query)
          .toArray();

        // Quantity in database is >= than requested amount
        if (selectedItem[0].numInStock >= receivedData[0].quantity) {
          let buyItem = await db.collection(Items_Collection).updateOne(query, {
            $set: {
              numInStock: selectedItem[0].numInStock - receivedData[0].quantity,
            },
          });
          return res.status(202).json({
            status: 202,
            message: "Sufficient amount in database to sell",
          });
        }
        // Quantity in database is < than requested amount
        else {
          return res.status(400).json({
            status: 400,
            message: "Insufficient amount in stock",
          });
        }
      }
      //========================== Received Multiple items inside cart ==========================//
      else if (receivedData.length > 1) {
        //========================== This part needs polishing ==========================//

        // For each elem inside received data, do the following
        for (const itemInsideCart of receivedData) {
          let query = { _id: itemInsideCart._id };
          let currentItem = await db
            .collection(Items_Collection)
            .find(query)
            .toArray();
          // Should use updateMany instead of updateOne
          let buyItem = await db.collection(Items_Collection).updateOne(query, {
            $set: {
              numInStock: currentItem[0].numInStock - itemInsideCart.quantity,
            },
          });
        }

        // Multiple items in cart
        // if Array length > 1 > updateMany
        return res.status(202).json({
          status: 202,
          message: "Multiple items purchased successfully",
        });
      }
      //========================== Received NOTHING inside cart ==========================//
      else {
        //received nothing
        return res.status(400).json({
          status: 400,
          message: "Nothing has been sent -> array length = 0",
        });
      }
    }
    //========================== Body is not an array ==========================//
    else {
      return res.status(400).json({
        status: 400,
        message: "Data sent is not an array, please update the data",
      });
    }
  } catch {
    return res.status(500).json({
      status: 500,
      message: "The server is currently unable to handle this request.",
    });
  } finally {
    // Close connection
    client.close();
  }
};

module.exports = {
  getItems,
  getItem,
  updateItemsNathan,
  getPagination,
  get25Items,
};
