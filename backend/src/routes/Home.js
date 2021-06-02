const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')

const bcrypt = require('bcrypt')

const User = require('../models/User.js')
const Product = require('../models/Product.js')


router.get('/', async (request, response) => {
  const products = await Product.findAll()

  var AllProducts = products.filter(item => item.id <= 9)

  return response.json(AllProducts)
})

router.post('/search', async (request, response)=> {
  const Op = Sequelize.Op
  const query = `%${request.body.search}%`

  const SearchProducts = await Product.findAll({where: {Title: { [Op.like]: query }}})

  return response.status(200).json({SearchProducts})

})

router.post('/register', (request, response) => {
  const { name, email, password } = request.body

  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      return response.status(401).send({ error: "Error interno" })

    } else  {
      const user = await User.create({ name: name, email: email, password: hash })

      return response.json({user})
    }
  })
})

router.post("/login", async(request, response) => {
  const user = request.body
  const userDataBase = await User.findAll({where: {email: user.email}})

  if (userDataBase.length === 0) {
    console.log("Este Usuário não existe")
  } else {
    const match = await bcrypt.compare(user.password, userDataBase[0].password)

    if (match) {
      // If match
    } else
      console.log("Senha incorreta")
  }

})


module.exports = router
