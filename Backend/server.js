const express = require("express");
const { main } = require("./models/index");
const productRoute = require("./router/product");
const storeRoute = require("./router/store");
const purchaseRoute = require("./router/purchase");
const salesRoute = require("./router/sales");
const cors = require("cors");
const User = require("./models/users");
const Product = require("./models/product");

const app = express();
const PORT = 4000;
main();
app.use(express.json());
app.use(cors());

// Store API
app.use("/api/store", storeRoute);

// Products API
app.use("/api/product", productRoute);

// Purchase API
app.use("/api/purchase", purchaseRoute);

// Sales API
app.use("/api/sales", salesRoute);

// ------------- Signin --------------
let userAuthCheck;
app.post("/api/login", async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
        password: req.body.password,
      },
    });
    console.log("USER: ", user);
    if (user) {
      res.send(user);
      userAuthCheck = user;
    } else {
      res.status(401).send("Invalid Credentials");
      userAuthCheck = null;
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Getting User Details of login user
app.get("/api/login", (req, res) => {
  res.send(userAuthCheck);
});
// ------------------------------------

// Registration API
app.post("/api/register", async (req, res) => {
  try {
    const registerUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber,
      imageUrl: req.body.imageUrl,
      username: req.body.firstName + req.body.lastName,
    });
    res.status(200).send(registerUser);
    console.log("Signup Successful");
  } catch (err) {
    console.log("Signup Error: ", err);
    res.status(500).send(err);
  }
});

// Test API for fetching a product
app.get("/testget", async (req, res) => {
  try {
    const result = await Product.findOne({
      where: { id: 1 }, // Replace with the appropriate condition
    });
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Here we are listening to the server
app.listen(PORT, () => {
  console.log("I am live again");
});