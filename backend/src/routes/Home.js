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

  var minPrice = request.body.Filters.minPrice
  var maxPrice = request.body.Filters.maxPrice === 0 ? 1999999 : request.body.Filters.maxPrice

  if (minPrice > maxPrice)
    return response.json({ error: "Insira uma faixa de preço válida" })
    
  const SearchProducts = await Product.findAll({
    where: {
      [Op.and] : [
        {Title: { [Op.iLike]: query }},
        {Price: { [Op.between]: [minPrice, maxPrice] }}
      ]
    }
  })

  return response.status(200).json({result: SearchProducts})
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
