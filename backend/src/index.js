const express = require('express')
const cors = require('cors')
const session = require('express-session')
const passport = require('passport')

//Routes
  const router = require('./routes/Home.js')
  const client = require('./routes/Client.js')
  const admin = require('./routes/Admin/Admin.js')
  const adminProducts = require('./routes/Admin/Products.js')
  const adminCategory = require('./routes/Admin/Categories.js')


require('./passportConfigs/auth')(passport)

const app = express()

app.use(session({
  secret: "ecommerce",
  resave: true,
  saveUninitialized: true
}))


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
  app.use('/', client)

  app.use('/admin', admin)
  app.use('/admin', adminProducts)
  app.use('/admin', adminCategory)



app.listen(8081, () => {console.log('server is running')})
