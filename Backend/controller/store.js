const Store = require("../models/store");

// Add Store
const addStore = async (req, res) => {
  try {
    const newStore = await Store.create({
      userID: req.body.userId,
      name: req.body.name,
      category: req.body.category,
      address: req.body.address,
      city: req.body.city,
      image: req.body.image,
    });

    res.status(200).send(newStore);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding store");
  }
};

// Get All Stores
const getAllStores = async (req, res) => {
  try {
    const findAllStores = await Store.findAll({
      order: [["_id", "DESC"]], // Sort by ID in descending order
    });

    res.status(200).json(findAllStores);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching stores");
  }
};

module.exports = { addStore, getAllStores };