import pkg from 'sequelize';
const { Model, DataTypes } = pkg

import { sequelize } from '../database/connect.js'

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

export { User }
