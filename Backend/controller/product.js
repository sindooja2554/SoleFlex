const Product = require("../models/product");
const Purchase = require("../models/purchase");
const Sales = require("../models/sales");
const User = require("../models/users");
const nodemailer = require("../utility/nodemailer");

// Add Product
const addProduct = async (req, res) => {
  try {
    const newProduct = await Product.create({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
    });
    if(req.body.stock > 90) {
    nodemailer.sendMail("vinaybilla2021@gmail.com", {template: "overstock"}, "High Stock Alert", {
      name: req.body.name,
      stock: req.body.stock
    });
  } if(req.body.stock < 10) {
    nodemailer.sendMail("vinaybilla2021@gmail.com", {template: "lowstock"}, "Low Stock Alert", {
      name: req.body.name,
      stock: req.body.stock
    });
  }
    res.status(200).send(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding product");
  }
};

// Get All Products
const getAllProducts = async (req, res) => {
  try {
    const findAllProducts = await Product.findAll({
      order: [["_id", "DESC"]], // Sort by ID in descending order
    });

    res.json(findAllProducts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching products");
  }
};

// Delete Selected Product
const deleteSelectedProduct = async (req, res) => {
  try {
    const deleteProduct = await Product.destroy({ where: { _id: req.params.id } });
    const deletePurchaseProduct = await Purchase.destroy({ where: { _id: req.params.id } });
    const deleteSaleProduct = await Sales.destroy({ where: { _id: req.params.id } });

    res.json({ deleteProduct, deletePurchaseProduct, deleteSaleProduct });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting product");
  }
};

// Update Selected Product
const updateSelectedProduct = async (req, res) => {
  try {
    await Product.update(
      {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        stock: req.body.stock,
      },
      { where: { _id: req.body.productID } }
    );
    const updatedProduct = await Product.findByPk(req.body.productID);
    if (updatedProduct.stock > 90) {
    nodemailer.sendMail("vinaybilla2021@gmail.com", {template: "overstock"}, "High Stock Alert", {
      name: updatedProduct.name,
      stock: updatedProduct.stock
    });
  }
    if (updatedProduct.stock < 10) {
      nodemailer.sendMail("vinaybilla2021@gmail.com", {template : "lowstock"}, 'Low Stock Alert', {
        name: updatedProduct.name,
        stock: updatedProduct.stock
      });
    }
    res.json(updatedProduct); // Return the updated product
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating product");
  }
};

// Search Products
const searchProduct = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;
    const products = await Product.findAll({
      where: {
        name: { [require("sequelize").Op.like]: `%${searchTerm}%` }, // Case-insensitive search
      },
    });

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error searching products");
  }
};

// Get Low Stock Products

module.exports = {
  addProduct,
  getAllProducts,
  deleteSelectedProduct,
  updateSelectedProduct,
  searchProduct,
};