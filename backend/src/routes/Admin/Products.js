const express = require('express')
const adminProducts = express.Router()
const multer = require('multer')
const path = require('path')
const sequelize = require('../../database/connect')
const uniqid = require('uniqid')



adminProducts.post('/get-product-Categories', async (request, response) => {
  var [result] = await sequelize.query(`SELECT * FROM categories`)

  return response.json({ result })
})

var storage = multer.diskStorage({
  destination: async (request, file, callback) => {
    callback(null, path.join(__dirname, '../../images/product-images/'))
  },
  filename: (request, file, callback) => {
    var FileOriginal = (file.originalname.replace(/\./g, "") + uniqid() + "." + file.mimetype.replace(/image\//g, "")).replace(/ /g, "")

    if (file.fieldname === "cover")
      request.coverName = FileOriginal
    else if (file.fieldname === "images") {
      if (typeof request.images !== "object") {
        request.images = []
        request.images.push(FileOriginal)
      }
      else
        request.images.push(FileOriginal)
      }

    callback(null, FileOriginal)
  }
})

let upload = multer({ storage: storage }).fields([{name: 'cover', maxCount: 1}, {name: 'images', maxCount: 8}])

adminProducts.post('/new-product', upload, async (request, response) => {
  var cover = request.coverName
  var images = ""
  var body = request.body

  for (var c in request.images) {
    images += ` ${request.images[c]}`
  }

  await sequelize.query(`
    INSERT INTO products 
    ("product_name", price, amount, cover, images, description)
    VALUES 
    ('${body.name}', ${body.price}, ${body.amount}, '${cover}', '${images}', '${body.description.replace(/'/, "")}')
  `)

  return response.json({ ola: "teste" })
})


module.exports = adminProducts