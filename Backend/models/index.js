// const mongoose = require("mongoose");
// // const uri = "mongodb+srv://adminhamza:adminhamza123&@cluster0.pzcviot.mongodb.net/InventoryManagementApp?retryWrites=true&w=majority";
// const uri = 'mongodb+srv://billavinay2012:GlBZZgme7Os9lfEd@soleflex.6pvtbvn.mongodb.net/?retryWrites=true&w=majority&appName=soleflex';


// function main() {
//     mongoose.connect(uri).then(() => {
//         console.log("Succesfull")
    
//     }).catch((err) => {
//         console.log("Error: ", err)
//     })
// }

// module.exports = { main };

// filepath: /Users/vinaybilla/Desktop/SoleFlex/Backend/models/index.js
const sequelize = require('../config/database'); // Import Sequelize instance

const main = async () => {
  try {
    await sequelize.authenticate(); // Test database connection
    console.log('Database connected successfully.');
    await sequelize.sync(); // Sync models with the database
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { main };