const express = require('express')
const router = require('./routes/Home.js')
const admin = require('./routes/Admin.js')
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')

require('./config/auth.js')(passport)

const app = express()

app.use(cors())

app.use(express.json())
app.use(session({
  secret: 'Programando todos os dias',
  resave: true,
  saveUninitialized: true,

}))
app.use('/', router)
app.use('/admin', admin)



app.listen(8081, () => {console.log('server is running')})
