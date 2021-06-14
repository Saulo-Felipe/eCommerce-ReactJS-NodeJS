const Sequelize = require('sequelize')

const sequelize = new Sequelize('e-commerce', 'postgres', 'saulo135512', {
  host: 'localhost',
  dialect: 'postgres'
})

module.exports = sequelize
