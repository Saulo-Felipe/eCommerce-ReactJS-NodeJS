import Sequelize from 'sequelize'

const sequelize = new Sequelize('eCommerce', 'postgres', 'saulo135512', {
  host: 'localhost',
  dialect: 'postgres'
})

export { sequelize }
