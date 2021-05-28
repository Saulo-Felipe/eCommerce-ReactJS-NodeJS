import pkg from 'sequelize';
const { Model, DataTypes } = pkg
import { sequelize } from '../database/connect.js'

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

export { Product }
