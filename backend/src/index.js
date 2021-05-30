const express = require('express')
const router = require('./routes/Home.js')
const admin = require('./routes/Admin.js')
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')

const app = express()



app.use(express.json())

//Configs de sessão
app.use(session({
  secret: "dc1b859c6c5d92073cb0ec8cf9bdb6f6",
  resave: true,
  saveUninitialized: true
}))

app.use(cors())



//Middlewares
    app.use((req, res, next) => {

      // res.locals.user = req.user || null

      next()
    })

//Routes
  app.use('/', router)
  app.use('/admin', admin)



app.listen(8081, () => {console.log('server is running')})
