const { Model, DataTypes } = require('sequelize')

const sequelize = require('../database/connect.js')

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'users'
}
)

module.exports = User
