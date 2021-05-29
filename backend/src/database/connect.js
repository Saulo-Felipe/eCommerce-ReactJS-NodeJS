const Sequelize = require('sequelize')

const sequelize = new Sequelize('eCommerce', 'postgres', 'saulo135512', {
  host: 'localhost',
  dialect: 'postgres'
})

module.exports = sequelize
