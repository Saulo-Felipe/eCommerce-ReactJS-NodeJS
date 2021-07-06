const Sequelize = require('sequelize')

const sequelize = new Sequelize('niiaxvpj', 'niiaxvpj', 'CSdaMAAEhIWN_VYLHoeeGyiIDo_6x-R2', {
  host: 'batyr.db.elephantsql.com',
  dialect: 'postgres'
})

module.exports = sequelize
