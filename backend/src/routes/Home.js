const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')

const User = require('../models/User.js')
const Product = require('../models/Product.js')


router.get('/', async (request, response) => {
  const products = await Product.findAll()

  var AllProducts = products.filter(item => item.id <= 9)

  return response.json(AllProducts)
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

router.post('/login', async(request, response) => {
  const {email_login, password_login} = request.body

  const user = await User.findAll({where: {email: email_login}})

  if (user.length == 0) {
    console.log("Usuario não encontrado")
    return response.status(400).json({ error: "User not found" })

  } else {
    const match = await bcrypt.compare(password_login, user[0].password)

    if (match) {
      console.log("Login Realizado com sucesso")


      return response.status(200).send({
        message: "Login Realizado com Sucesso!",
      })

    } else {
      console.log("Inválid Password")
      return response.status(401).json({ error: "Inválid Password" })
    }
  }

})

router.post("/teste", (request, response) => {
  console.log(request.userId)
  return response.send({ message: "ok" })
})

module.exports = router
