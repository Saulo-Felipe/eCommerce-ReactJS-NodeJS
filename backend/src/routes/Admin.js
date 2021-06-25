const express = require('express')
const admin = express.Router()
const multer = require('multer')
const path = require('path')
const sequelize = require('../database/connect')

var storage = multer.diskStorage({
  destination: async (request, file, callback) => {
    callback(null, '../frontend/src/coversProduct/')
  },
  filename: (request, file, callback) => {
    //console.log('filename call: ',request.files[0])
    callback(null, file.originalname)
  }
})

let upload = multer({ storage: storage }).fields([{name: 'cover', maxCount: 1}, {name: 'images', maxCount: 8}])

admin.post('/products', async (request, response) => {
  var [result] = await sequelize.query(`SELECT * FROM categories`)

  return response.json({ result })
})

admin.post('/relationship', async(request, response) => {
  const { CategoriesToProducts } = request.body

  console.log(CategoriesToProducts)

  const [lastProduct] = await sequelize.query(`SELECT MAX(id) from products`)

  console.log('max:', lastProduct[0].max)

  for (var c of CategoriesToProducts) {
    var [result] = await sequelize.query(`INSERT INTO category_product (product_id, category_id) values (${lastProduct[0].max}, ${c})`)
  }

  return response.json({ OK: "ok" }) 
})

admin.post('/new-product', upload, async (request, response) => {
  var cover = request.files.cover[0].originalname
  var images = ""
  var body = request.body

  for (var c in request.files.images) {
    images += ` ${request.files.images[c].originalname}`
  }

  console.log(request.body.name)

  await sequelize.query(`
    INSERT INTO products 
    ("product_name", price, amount, cover, images, description)
    VALUES 
    ('${body.name}', ${body.price}, ${body.amount}, '${cover}', '${images}', '${body.description}')
  `)

  return response.json({ ola: "teste" })
})

admin.post('/categories', async (request, response) => {
  if (request.body.type === "especific category") {
    var [result] = await sequelize.query(`SELECT * FROM categories WHERE category_name ILIKE '%${request.body.category}%'`)

    return response.json({ result })
  }
  var [result] = await sequelize.query(`SELECT * FROM categories`)

  return response.json({ result })
})

admin.post('/new-category', async(request, response) => {
  try {
    var result = request.body.category
    result = result.normalize('NFD').replace(/[\u0300-\u036f]/g, "")

    console.log(result)

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

admin.post('/delete-category', async (request, response) => {
  try {
    const {id} = request.body

    var [result] = await sequelize.query(`DELETE FROM categories WHERE id = ${id}`)

    return response.json({ message: "Categoria deletada com sucesso." })
  }
  catch(error) {
    return response.json({ error: `Erro interno, por favor, tente novamente mais tarde. ${error}` })
  }
})

admin.post('/update-category', async (request, response) => {
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

module.exports = admin