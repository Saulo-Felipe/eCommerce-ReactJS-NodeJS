import express from 'express'
const admin = express.Router()
import { Product } from '../models/Product.js'


admin.post('/new-product', async (request, response) => {
  const { Title, Price } = request.body
  const produto = await Product.create({ Title: Title, Price: Price })
  return response.json({produto})
})

export {admin}
