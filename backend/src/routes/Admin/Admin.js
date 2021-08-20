const express = require('express')
const admin = express.Router()
const multer = require('multer')
const path = require('path')
const sequelize = require('../../database/connect')



admin.post('/relationship', async(request, response) => {
  const { CategoriesToProducts } = request.body

  const [lastProduct] = await sequelize.query(`SELECT MAX(id) from products`)

  for (var c of CategoriesToProducts) {
    var [result] = await sequelize.query(`INSERT INTO category_product (product_id, category_id) values (${lastProduct[0].max}, ${c})`)
  }

  return response.json({ OK: "ok" }) 
})








module.exports = admin