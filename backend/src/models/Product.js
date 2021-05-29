const { Model, DataTypes } = require('sequelize')
const sequelize = require('../database/connect.js')

const Product = sequelize.define('Product', {
  Title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Price: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: 'products'
})

module.exports = Product
