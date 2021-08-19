const express = require('express')
const router = express.Router()
const sequelize = require('../database/connect')
const bcrypt = require('bcrypt')
const path = require('path')
const jwt = require('jsonwebtoken')



router.get('/', async(request, response) => {
  try {
    var [AllProducts] = await sequelize.query('SELECT * FROM products LIMIT 9')

    return response.send(AllProducts)
  }
  catch(error) {
    console.log('\n\n\n=========================| Error |=====================\n', error)
    return response.json({ error: "Erro na home principal." })
  }
})

router.get('/images/:image_name/:id/:type', async(request, response) => {
    try {
      if (request.params.id === "null" && request.params.type === "profile")
          return response.sendFile(path.join(__dirname, '../images/profile-images/user.png'))

      if (request.params.type === "profile") {
        const [VerifyImage] = await sequelize.query(`
          SELECT profile_photo, id from clients WHERE profile_photo = '${request.params.image_name}'
        `)
        if (VerifyImage.length === 0) return response.json({ noFile: true })
        return response.sendFile(path.join(__dirname,`../images/profile-images/${request.params.image_name}`))
      }
      else if (request.params.type === "product") {
        const [verifyProductImage] = await sequelize.query(`
          SELECT cover, id from products WHERE cover = '${request.params.image_name}'
        `)
        if (verifyProductImage.length === 0) return response.json({ noFile: true })
        return response.sendFile(path.join(__dirname,`../images/product-images/${ request.params.image_name }`))
      } else if (request.params.type === "multiples") {
        const [allImages] = await sequelize.query(`
          SELECT images FROM products WHERE id = ${request.params.id}
        `)

        if (allImages.length === 0) return response.json({noFile: true})


        return response.sendFile(path.join(__dirname, `../images/product-images/${request.params.image_name}`))
      }
      else return response.json({ noFile: true })

    } catch(error) {
        console.log('\n\n\n=========================| Error |=====================\n', error)
        return response.json({ error: "Erro ao buscar imagem" })
    }
})

router.post('/search', async(request, response)=> {
    try {
        //Filter
            var minPrice = request.body.Filters.minPrice
            var maxPrice = request.body.Filters.maxPrice === 0 ? 1999999 : request.body.Filters.maxPrice

        var pagePositon = request.body.position === 1 ? 0 : request.body.position -1

        if (minPrice >= maxPrice) return response.json({ error: 'Insira uma faixa de preço válida' })

        const [countPage] = await sequelize.query(`
            SELECT * FROM 
            products WHERE 
            "product_name" iLIKE 
            '%${request.body.search}%' 
            AND price >= ${minPrice} 
            AND price <= ${maxPrice} 
        `)
        const [result] = await sequelize.query(`
            SELECT * FROM products 
            WHERE "product_name" iLIKE '%${request.body.search}%' 
            AND price >= ${minPrice} 
            AND price <= ${maxPrice} 
            OFFSET ${pagePositon * 9} 
            LIMIT 9 
        `)

        console.log('retornando resultado de pesqusia: ', result, 'AND', countPage)
        
        return response.status(200).json({result: result, countPage: countPage.length})
    }
    catch(error) {
        console.log('\n\n\n=========================| Error |=====================\n', error)
        return response.json({ error: 'Erro ao selecionar produtos e likes.' })
    }
})

router.post('/search/filter-category', async(request, response) => {
    try {
        const [result, others] = await sequelize.query(`
            SELECT * FROM categories 
            WHERE category_name 
            iLike '%${ request.body.inputValue.length === 0 ? '' : request.body.inputValue }%'
        `)

        return response.status(200).json({ result })
    }
    catch(error) {
        console.log('\n\n\n=========================| Error |=====================\n', error)
        return response.json({ error: "Erro ao selecionar categorias." })
    }
})

router.post('/register', async(request, response) => {
    try {
        const { name, email, password } = request.body

        const [verifyInfo] = await sequelize.query(`SELECT * FROM clients WHERE email = '${email}'`)

        if (verifyInfo && verifyInfo.length > 0) {
            return response.json({ error: "Esse email já pertence a outra conta" })
        }

        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                return response.status(401).send({ error: "Error interno" })

            } else  {
                const [user] = await sequelize.query(`INSERT INTO clients (user_name, email, password) VALUES ('${name}', '${email}', '${hash}')`)
                const [theLastUser] = await sequelize.query(`SELECT id from clients WHERE email = '${email}'`)
                await sequelize.query(`INSERT INTO client_adress (client_id) VALUES (${theLastUser[0].id})`)
                return response.json({user})
            }
        })
    }
    catch(error) {
        console.log('\n\n\n=========================| Error |=====================\n', error)
        return response.json({ error: "Erro ao realizar cadastro." })
    }
})


router.post('/login', async(request, response) => {
  try {
    const login = request.body
    const [user] = await sequelize.query(`SELECT * FROM clients WHERE email = '${login.email}'`)

    if (user.length === 0)
      return response.json({ message: 'Esse email não pertence a nenhum usuário.' })

    bcrypt.compare(login.password, user[0].password, (error, success) => {
        if (success) {
            const token = jwt.sign({ userId: user[0].id }, process.env.SECRETE_TOKEN, { expiresIn: 30 })

            request.token_login = token

            return response.json({ auth: true, token: token })

        } else {
            return response.json({ message: 'Senha incorreta!' })
        }
    })

  }
  catch(error) {
    console.log('\n\n\n=========================| Error |=====================\n', error)
    return response.json({ error: "erro ao realizar Login." })
  }
})


router.post('/logout', (request, response) => {
  try {
    request.session.destroy(err => {
      return response.json({ logout: true })
    })
  }
  catch(error) {
    console.log('\n\n\n=========================| Error |=====================\n', error)
    return response.json({ error: 'Error ao fazer logout, tente novamente em instantes...' })
  }
})



module.exports = router