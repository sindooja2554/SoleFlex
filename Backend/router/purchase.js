const express = require("express");
const app = express.Router();
const purchase = require("../controller/purchase");

// Add Purchase
app.post("/add", purchase.addPurchase);

// Get All Purchase Data
app.get("/get/:userID", purchase.getPurchaseData);

app.get("/get/:userID/totalpurchaseamount", purchase.getTotalPurchaseAmount);

app.get("/get", purchase.getPurchaseData);

module.exports = app;

// http://localhost:4000/api/purchase/add POST
// http://localhost:4000/api/purchase/get GET
