const express = require('express')
const router = express.Router()
const passport = require('passport')

const bcrypt = require('bcrypt')

const User = require('../models/User.js')
const Product = require('../models/Product.js')


router.get('/', async (req, res) => {
  const products = await Product.findAll()

  var AllProducts = products.filter(item => item.id <= 9)

  return res.json(AllProducts)
})


router.post('/register', (req, res) => {
  const { name, email, password } = req.body

  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      return res.status(401).send({ error: "Error interno" })

    } else  {
      const user = await User.create({ name: name, email: email, password: hash })

      return res.json({user})
    }
  })
})


module.exports = router
