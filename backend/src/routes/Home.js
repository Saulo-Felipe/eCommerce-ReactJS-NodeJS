import express from 'express'
const router = express.Router()
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import authToken from '../config/auth.json'

import { Product } from '../models/Product.js'
import { User } from '../models/User.js'

router.get('/', async (request, response) => {
  const products = await Product.findAll()

  var AllProducts = products.filter(item => item.id <= 9)

  return response.json(AllProducts)

})

router.post('/', async (request, response) => {
  const { Title, Price } = request.body

  const produto = await Product.create({ Title: Title, Price: Price })

  return response.json({produto})
})

router.post('/new-user', (request, response) => {
  const { name, email, password } = request.body

  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      console.log("erro no crypt")
      return response.status(400).send({ error: "Error interno" })
    } else  {
      const user = await User.create({ name: name, email: email, password: hash })
      return response.json({user})
    }
  })
})

router.post('/login', async (request, response) => {
  const {email_login, password_login} = request.body

  const user = await User.findAll({where: {email: email_login}})

  if (user.length == 0) {
    console.log("Usuario não encontrado")
  } else {
    const match = await bcrypt.compare(password_login, user[0].dataValues.password)
    if (match) {
      console.log("batem")
    } else {
      console.log("Inválid Password")
    }
  }
  user[0].dataValues.password = undefined

  //Criando token
  const token = jwt.sign({ id: user[0].dataValues.id }, authToken.secret, {
    expiresIn: 86400,
  })

  return response.json({user, token})

})

export {router}
