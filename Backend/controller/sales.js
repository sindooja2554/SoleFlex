const Sales = require("../models/sales");
const soldStock = require("../controller/soldStock");

// Add Sales
const addSales = async (req, res) => {
  try {
    const addSale = await Sales.create({
      userID: req.body.userID,
      ProductID: req.body.productID,
      StoreID: req.body.storeID,
      StockSold: req.body.stockSold,
      SaleDate: req.body.saleDate,
      TotalSaleAmount: req.body.totalSaleAmount,
    });

    // Update stock using soldStock controller
    await soldStock.updateStockOnSale(req.body.productID, req.body.stockSold);

    res.status(200).send(addSale);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

// Get All Sales Data
const getSalesData = async (req, res) => {
  try {
    const findAllSalesData = await Sales.findAll({
      order: [["_id", "DESC"]], // Sort by ID in descending order
      include: ["Product", "Store"], // Include associated Product and Store models
    });

    res.status(200).json(findAllSalesData);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching sales data");
  }
};

// Get total sales amount
const getTotalSalesAmount = async (req, res) => {
  try {
    const salesData = await Sales.findAll({
    });

    const totalSaleAmount = salesData.reduce(
      (total, sale) => total + sale.TotalSaleAmount,
      0
    );

    res.status(200).json({ totalSaleAmount });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error calculating total sales amount");
  }
};

// Get Monthly Sales
const getMonthlySales = async (req, res) => {
  try {
    const sales = await Sales.findAll();

    // Initialize array with 12 zeros
    const salesAmount = Array(12).fill(0);

    sales.forEach((sale) => {
      const monthIndex = parseInt(sale.SaleDate.split("-")[1]) - 1; // Extract month from SaleDate
      salesAmount[monthIndex] += sale.TotalSaleAmount;
    });

    res.status(200).json({ salesAmount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  addSales,
  getSalesData,
  getTotalSalesAmount,
  getMonthlySales,
};