const Purchase = require("../models/purchase");
const purchaseStock = require("./purchaseStock");
const Users = require("../models/users");
const mailService = require("../utility/nodemailer");
const nodemailer = require("../utility/nodemailer");
// Add Purchase Details
const addPurchase = (req, res) => {
  const addPurchaseDetails = new Purchase({
    userID: req.body.userID,
    ProductID: req.body.productID,
    QuantityPurchased: req.body.quantityPurchased,
    PurchaseDate: req.body.purchaseDate,
    TotalPurchaseAmount: req.body.totalPurchaseAmount,
  });

  addPurchaseDetails
    .save()
    .then(async (result) => {
      purchaseStock(req.body.productID, req.body.quantityPurchased, req.body, result._id);
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(402).send(err);
    });
};

// Get All Purchase Data
const getPurchaseData = async (req, res) => {
  try {
    const findAllPurchaseData = await Purchase.findAll({
      order: [["_id", "DESC"]], // Sort by ID in descending order
      include: [
        {
          model: require("../models/product"), // Import the Product model
          as: "Product", // Alias must match the one defined in the association
        },
      ],
    });
    res.status(200).json(findAllPurchaseData);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching purchase data");
  }
};

// Get total purchase amount
const getTotalPurchaseAmount = async (req, res) => {
  try {
    const purchaseData = await Purchase.findAll({
      where: { userID: req.params.userID },
    });

    const totalPurchaseAmount = purchaseData.reduce(
      (total, purchase) => total + purchase.TotalPurchaseAmount,
      0
    );

    res.status(200).json({ totalPurchaseAmount });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error calculating total purchase amount");
  }
};

module.exports = { addPurchase, getPurchaseData, getTotalPurchaseAmount };