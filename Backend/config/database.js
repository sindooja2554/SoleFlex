// filepath: /config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('soleflexnew', 'root', 'Psd@1234', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;