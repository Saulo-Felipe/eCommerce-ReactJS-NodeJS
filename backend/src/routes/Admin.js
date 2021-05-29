const express = require('express')
const admin = express.Router()
const Product = require('../models/Product.js')


admin.post('/new-product', async (request, response) => {
  const { Title, Price } = request.body
  const produto = await Product.create({ Title: Title, Price: Price })
  return response.json({produto})
})

module.exports = admin