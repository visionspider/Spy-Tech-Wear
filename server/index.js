"use strict";

const express = require("express");
const morgan = require("morgan");

const PORT = 4000;
// Nathan's API file
const { getItems, getItem, updateItemsNathan } = require("./handler1");
const { getCompanies, getCompany, updateItems } = require("./handler2");

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // ======================== List of all enpoints ========================//

  // Gets list of all items in database
  .get("/api/get-items", getItems)
  // Gets list of specific item in database
  .get("/api/get-items/:itemId", getItem)
  // Gets list of all companies in database
  .get("/api/get-companies", getCompanies)
  // Gets list of specific company in database
  .get("/api/get-companies/:companyId", getCompany)
  // Updates item when user buys items Danqi Version
  .patch("/api/update-items", updateItems)
  // Updates item when user buys items Nathan Version
  .patch("/api/update-items", updateItemsNathan)

  // Handles all the endpoints
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
