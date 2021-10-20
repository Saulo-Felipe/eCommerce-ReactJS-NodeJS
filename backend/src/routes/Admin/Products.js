const express = require('express')
const adminProducts = express.Router()
const multer = require('multer')
const path = require('path')
const sequelize = require('../../database/connect')
const uniqid = require('uniqid')
const fs = require('fs')



adminProducts.post('/get-product-Categories', async (request, response) => {
  var [result] = await sequelize.query(`SELECT * FROM categories`)

  return response.json({ result })
})

var storage = multer.diskStorage({
  destination: async (request, file, callback) => {
    callback(null, path.join(__dirname, '../../images/product-images/'))
  },
  filename: (request, file, callback) => {
    console.log("file: ", file)

    var FileOriginal = (file.originalname.replace(/\./g, "") + uniqid() + "." + file.mimetype.replace(/image\//g, "")).replace(/ /g, "")


    if (file.fieldname === "cover")
      request.coverName = FileOriginal
    else if (file.fieldname === "images") {
      if (typeof request.images !== "object") {
        request.images = []
        request.images.push(FileOriginal)
      }
      else
        request.images.push(FileOriginal)
      }
    
    callback(null, FileOriginal)
  }
})

let upload = multer({ storage: storage }).fields([{name: 'cover', maxCount: 1}, {name: 'images', maxCount: 8}])

adminProducts.post('/new-product', upload, async (request, response) => {
  var cover = request.coverName
  var images = ""
  var body = request.body

  for (var c in request.images) {
    images += ` ${request.images[c]}`
  }

  await sequelize.query(`
    INSERT INTO products 
    ("product_name", price, amount, cover, images, description)
    VALUES 
    ('${body.name}', ${body.price}, ${body.amount}, '${cover}', '${images}', '${body.description.replace(/'/, "")}')
  `)

  return response.json({ status: true })
})

adminProducts.post('/get-product', async (request, response) => {
  try {
    const { id, description } = request.body

    var [result] = await sequelize.query(`SELECT * FROM products WHERE id = ${id}`)

    if (result.length === 0) 
      return response.json({ status: false })
    else
      return response.json({ status: true, result }) 
  }
  catch(error) {
    console.log('\n\n\n=========================| Error |=====================\n', error)
    return response.json({ error: 'Error interno.' })
  }
})

adminProducts.post('/edit-product', upload, async(request, response) => {
  try {
    var cover = request.coverName
    var images = ""
    var body = request.body
  
    for (var c in request.images) {
      images += ` ${request.images[c]}`
    }

    var [oldValues] = await sequelize.query(`SELECT price, cover, images FROM products WHERE id = ${body.id}`)

    console.log("Valores antigo:", oldValues)
    console.log("Replace: ", oldValues[0].images.split(" "))
    
    var removeImages = oldValues[0].images.split(" ")
    for (var count of removeImages) {
      if (count.length !== 0 && count !== " " && count !== "") {

        fs.unlink(path.join(__dirname, `../../images/product-images/${count}`), (err) => {
          if (err) throw err;
          console.log("Imagens deletadas")
        })
      }
    }

    var deleteCover = oldValues[0].cover
    fs.unlink(path.join(__dirname, `../../images/product-images/${deleteCover}`), (err) => {
      if (err) throw err;
      console.log("Cover deletado: ", deleteCover)
    })

    
    await sequelize.query(`
      UPDATE products SET 
      product_name = '${body.name}',
      price = ${body.price},
      amount = ${body.amount},
      cover = '${cover}',
      images = '${images}',
      description = '${body.description.replace(/'/, "")}',
      sale = ${Number(body.price) < Number(oldValues[0].price) ? true : false }
      WHERE id = ${body.id}
    `)


  
    return response.json({ status: true })

  }
  catch(error) {
    console.log('\n\n\n=========================| Error |=====================\n', error)
    return response.json({ error: 'Error interno.' })
  }
})

adminProducts.post('/categoriesInProduct', async(request, response) => {
  try {
    const { id } = request.body

    var [result] = await sequelize.query(`
      SELECT categories.id, categories.category_name FROM categories
      INNER JOIN category_product ON categories.id = category_product.category_id
      INNER JOIN products ON category_product.product_id = products.id
      WHERE products.id = ${id}    
    `)

    return response.json({ result })

  }
  catch(error) {
    console.log('\n\n\n=========================| Error |=====================\n', error)
    return response.json({ error: 'Error interno.' })
  }
})


module.exports = adminProducts