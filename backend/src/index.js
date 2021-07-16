const express = require('express')
const router = require('./routes/Home.js')
const admin = require('./routes/Admin.js')
const cors = require('cors')
const session = require('express-session')
const passport = require('passport')
require('./passportConfigs/auth')(passport)

const app = express()

app.use(session({
  secret: "ecommerce",
  resave: true,
  saveUninitialized: true
}))


app.use((request, response, next) => {
  console.log('Session: ', request.session)

  next()
})


app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())

app.use(express.urlencoded({ extended: true}))

app.use(cors({ 
  origin:'http://localhost:3000', 
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus:200  
}))

//Routes
  app.use('/', router)
  app.use('/admin', admin)



app.listen(8081, () => {console.log('server is running')})
