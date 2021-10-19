const express = require('express')
const adminCategory = express.Router()
const sequelize = require('../../database/connect')

adminCategory.post('/categories', async (request, response) => {
  if (request.body.type === "especific category") {
    var [result] = await sequelize.query(`SELECT * FROM categories WHERE category_name ILIKE '%${request.body.category}%'`)

    return response.json({ result })
  }

  var [result] = await sequelize.query(`SELECT * FROM categories`)

  return response.json({ result })
})

adminCategory.post('/new-category', async(request, response) => {
  try {
    var result = request.body.category
    result = result.normalize('NFD').replace(/[\u0300-\u036f]/g, "")

    var [res] = await sequelize.query(`SELECT * FROM categories WHERE LOWER(category_name) = LOWER('${result}')`)

    if (res.length > 0) 
      return response.json({ error: "Essa categoria já existe." })

    var category = result[0].toUpperCase() + result.slice(1,)

    await sequelize.query(`INSERT INTO categories (category_name) VALUES ('${category}')`)

    return response.json({ message: "Categoria cadastrada com sucesso!" })
  }
  catch(error) {
    console.log(error)
  }
})

adminCategory.post('/delete-category', async (request, response) => {
  try {
    const {id} = request.body

    await sequelize.query(`DELETE FROM categories WHERE id = ${id}`)

    return response.json({ message: "Categoria deletada com sucesso." })
  }
  catch(error) {
    return response.json({ error: `Erro interno, por favor, tente novamente mais tarde. ${error}` })
  }
})

adminCategory.post('/update-category', async (request, response) => {
  try {
    const {type} = request.body

    if (type === "search id") {
      const { id } = request.body
      var [result] = await sequelize.query(`SELECT * FROM categories WHERE id = ${id}`)

      if (result.length === 0) {
        return response.json({error: "Erro interno, id não encontrado."})
      } else {
        return response.json({ result: result[0].category_name })
      }
    } else {
      var { id, newValue } = request.body
      var category = newValue[0].toUpperCase() + newValue.slice(1,)
      newValue = category.normalize('NFD').replace(/[\u0300-\u036f]/g, "")

      var [result] = await sequelize.query(`UPDATE categories SET category_name = '${newValue}' WHERE id = ${id}`)

      return response.status(200).json({ Finish: "finish" })
    }
  }
  catch(error) {
    return response.json({ error: `Erro interno, por favor, tente novamente mais tarde. ${error}` })
  }
})


module.exports = adminCategory