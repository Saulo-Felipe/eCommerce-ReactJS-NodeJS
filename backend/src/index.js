import express from 'express'
import { router } from './routes/Home.js'
import { admin } from './routes/Admin.js'
import cors from 'cors'
import '../config/auth.js'

// import './database/connect.js'

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.session({
  secret: 'Programando todos os dias',
  resave: true,
  saveUninitialized: true,

}))
app.use('/', router)
app.use('/admin', admin)



app.listen(8081, () => {console.log('server is running')})
