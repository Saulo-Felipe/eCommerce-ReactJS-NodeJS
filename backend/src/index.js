const express = require('express')
const cors = require('cors')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
const helmet = require('helmet')
require('dotenv').config()

//Routes
  const router = require('./routes/Home.js')
  const client = require('./routes/Client.js')
  const admin = require('./routes/Admin/Admin.js')
  const adminProducts = require('./routes/Admin/Products.js')
  const adminCategory = require('./routes/Admin/Categories.js')
  const userProduct = require('./routes/User/userProduct.js')


const app = express()

//Middleware
  app.use(helmet())

  app.use(session({
  secret: "ecommerce",
    resave: true,
    saveUninitialized: true
  }))

  app.use(passport.initialize())
  app.use(passport.session())
  app.use(flash())
  app.use(express.json())

  app.use(cors({ 
    origin: process.env.FRONTEND_URL, 
    credentials: true,
    optionSuccessStatus: 200
  }))

//Routes
  app.use('/', router)
  app.use('/', client)
  app.use('/', userProduct)

  app.use('/admin', admin)
  app.use('/admin', adminProducts)
  app.use('/admin', adminCategory)



app.listen(process.env.PORT || 8081, () => {console.log('Server is Running 💻🚀')})
