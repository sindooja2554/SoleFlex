const mongoose = require("mongoose");
// const uri = "mongodb+srv://adminhamza:adminhamza123&@cluster0.pzcviot.mongodb.net/InventoryManagementApp?retryWrites=true&w=majority";
const uri = 'mongodb+srv://billavinay2012:GlBZZgme7Os9lfEd@soleflex.6pvtbvn.mongodb.net/?retryWrites=true&w=majority&appName=soleflex';


function main() {
    mongoose.connect(uri).then(() => {
        console.log("Succesfull")
    
    }).catch((err) => {
        console.log("Error: ", err)
    })
}

module.exports = { main };