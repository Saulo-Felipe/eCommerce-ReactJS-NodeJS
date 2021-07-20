const express = require('express')
const adminProducts = express.Router()
const multer = require('multer')
const path = require('path')
const sequelize = require('../../database/connect')



adminProducts.post('/get-product-Categories', async (request, response) => {
  var [result] = await sequelize.query(`SELECT * FROM categories`)

  return response.json({ result })
})

var storage = multer.diskStorage({
  destination: async (request, file, callback) => {
    callback(null, path.join(__dirname, '../../images/product-images/'))
  },
  filename: (request, file, callback) => {
    callback(null, file.originalname)
  }
})

let upload = multer({ storage: storage }).fields([{name: 'cover', maxCount: 1}, {name: 'images', maxCount: 8}])


adminProducts.post('/new-product', upload, async (request, response) => {
  var cover = request.files.cover[0].originalname.replaceAll(/ /g, "-")
  var images = ""
  var body = request.body

  for (var c in request.files.images) {
    images += ` ${request.files.images[c].originalname.replaceAll(/ /g, "-")}`
  }

  await sequelize.query(`
    INSERT INTO products 
    ("product_name", price, amount, cover, images, description)
    VALUES 
    ('${body.name}', ${body.price}, ${body.amount}, '${cover}', '${images}', '${body.description}')
  `)

  return response.json({ ola: "teste" })
})


module.exports = adminProducts