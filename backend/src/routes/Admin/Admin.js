const express = require('express')
const admin = express.Router()
const multer = require('multer')
const path = require('path')
const sequelize = require('../../database/connect')



admin.post('/relationship', async(request, response) => {
  const { CategoriesToProducts } = request.body
  const [lastProduct] = await sequelize.query(`SELECT MAX(id) from products`)

  if (request.body.type && request.body.type === "edit") {
    await sequelize.query(`DELETE FROM category_product WHERE product_id = ${lastProduct[0].max}`)

    for (var c of CategoriesToProducts) {
      await sequelize.query(`INSERT INTO category_product (product_id, category_id) values (${lastProduct[0].max}, ${c})`)
    }
    
  } else {
    for (var c of CategoriesToProducts) {
      await sequelize.query(`INSERT INTO category_product (product_id, category_id) values (${lastProduct[0].max}, ${c})`)
    }
  
    return response.json({ OK: "ok" })    
  } 
})








module.exports = admin