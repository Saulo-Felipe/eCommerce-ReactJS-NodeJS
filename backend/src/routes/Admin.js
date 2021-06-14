const express = require('express')
const admin = express.Router()


admin.post('/new-product', async (request, response) => {
  const { Title, Price } = request.body
  const produto = await Product.create({ Title: Title, Price: Price })
  return response.json({produto})
})

module.exports = admin
