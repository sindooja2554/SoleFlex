const Purchase = require("../models/purchase");
const purchaseStock = require("./purchaseStock");

// Add Purchase Details
const addPurchase = async (req, res) => {
  try {
    const addPurchaseDetails = await Purchase.create({
      userID: req.body.userID,
      ProductID: req.body.productID,
      QuantityPurchased: req.body.quantityPurchased,
      PurchaseDate: req.body.purchaseDate,
      TotalPurchaseAmount: req.body.totalPurchaseAmount,
    });

    // Update stock using purchaseStock controller
    await purchaseStock.updateStockOnPurchase(req.body.productID, req.body.quantityPurchased);

    res.status(200).send(addPurchaseDetails);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

// Get All Purchase Data
const getPurchaseData = async (req, res) => {
  try {
    const findAllPurchaseData = await Purchase.findAll({
      where: { userID: req.params.userID },
      order: [["_id", "DESC"]], // Sort by ID in descending order
      include: ["Product"], // Include associated Product model
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