const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import your Sequelize instance
const Product = require("./product"); // Import the Product model

const Purchase = sequelize.define('Purchase', {
  _id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // Table name for users
      key: '_id',
    },
  },
  ProductID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'products', // Table name for products
      key: '_id',
    },
  },
  QuantityPurchased: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  PurchaseDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  TotalPurchaseAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  tableName: 'purchases',
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Define the association
Purchase.belongsTo(Product, { foreignKey: "ProductID", as: "Product" });

module.exports = Purchase;