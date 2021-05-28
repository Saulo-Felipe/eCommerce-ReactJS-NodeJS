import express from 'express'
import {router} from './routes/Home.js'
import cors from 'cors'
// import './database/connect.js'

const app = express()

app.use(cors())

app.use(express.json())

app.use('/', router)



app.listen(8081, () => {console.log('server is running')})
