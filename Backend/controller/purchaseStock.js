const Product = require("../models/product");
const User = require("../models/users");
const nodemailer = require("../utility/nodemailer");

const purchaseStock = async (productID, purchaseStockData, data, purchaseId) => {
  console.log("Product ID", productID, "Purchase stock data", purchaseStockData);

  try {
    // Find the product by its ID
    const myProductData = await Product.findByPk(productID);

    if (!myProductData) {
      throw new Error(`Product with ID ${productID} not found`);
    }

    // Calculate the updated stock
    const myUpdatedStock = parseInt(myProductData.stock) - purchaseStockData;

    if (myUpdatedStock < 0) {
      throw new Error("Insufficient stock");
    }

    // Update the product's stock
    await Product.update(
      { stock: myUpdatedStock },
      { where: { _id: productID } }
    );
    const user = await User.findByPk(data.userID);
    if (user) {
        nodemailer.sendMail(user.email, {template : "orderplaced"}, 'Order Placed Sucessfully',{
          orderId: purchaseId,
          name: myProductData.name,
          orderDate: data.purchaseDate,
          quantity: data.quantityPurchased,
          price: myProductData.price,
          totalAmount: data.totalPurchaseAmount,
        });
      }
    if (myUpdatedStock < 10) {
      nodemailer.sendMail("vinaybilla2021@gmail.com", {template : "lowstock"}, 'Low Stock Alert', {
        name: myProductData.name,
        stock: myUpdatedStock,
      });
    }
  } catch (error) {
    console.error("Error updating Purchase stock:", error);
    throw error; // Re-throw the error to propagate it to the caller
  }
};

module.exports = purchaseStock;