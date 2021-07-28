const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, 'build')))

app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(process.env.PORT || 3000, (error) => {
	if (error) return console.log(`==========| Erro encontrado: |==========\n${error}`)

	console.log('Server is Running')
})