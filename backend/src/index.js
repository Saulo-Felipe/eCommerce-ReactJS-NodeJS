const express = require('express')
const cors = require('cors')
const flash = require('connect-flash')
const helmet = require('helmet')
const jwt = require('jsonwebtoken')

const app = express()

require('dotenv').config()

//Routes
  const router = require('./routes/Home.js')
  const client = require('./routes/Client.js')
  const admin = require('./routes/Admin/Admin.js')
  const adminProducts = require('./routes/Admin/Products.js')
  const adminCategory = require('./routes/Admin/Categories.js')
  const userProduct = require('./routes/User/userProduct.js')

const verifyToken = function(request, response, next) {
  const token = request.headers.authorization

  if (request.method !== 'GET' && typeof token !== 'undefined' && token !== 'null' && token.length !== 0) {
    jwt.verify(token, process.env.SECRETE_TOKEN, async(err, decoded) => {
      if (err) {

        return response.json({ token_isValid: false })
      } else {
        next()
      }
    })

  } else {
    next()
  }
}

//Middleware
  app.use(helmet())

  app.use(flash())
  app.use(express.json())

  app.use(cors({ 
    origin: process.env.FRONTEND_URL, 
    credentials: true,
    optionSuccessStatus: 200
  }))

  app.use(verifyToken)


//Routes
  app.use('/', router)
  app.use('/', client)
  app.use('/', userProduct)

  app.use('/admin', admin)
  app.use('/admin', adminProducts)
  app.use('/admin', adminCategory)



app.listen(process.env.PORT || 8081, () => console.log('Server is Running 💻🚀'))
