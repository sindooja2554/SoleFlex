// filepath: /config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('soleflexnew', 'root', 'alt_4444', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;