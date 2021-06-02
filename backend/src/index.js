const express = require('express')
const router = require('./routes/Home.js')
const admin = require('./routes/Admin.js')
const cors = require('cors')
const cookie = require('cookie-parser')

const app = express()




app.use(express.json())
app.use(cors())

//Routes
  app.use('/', router)
  app.use('/admin', admin)



app.listen(8081, () => {console.log('server is running')})
