const express = require('express')
const router = express.Router()
const sequelize = require('../database/connect')
const multer = require('multer')

const bcrypt = require('bcrypt')


router.get('/', async(request, response) => {

    var [AllProducts, others] = await sequelize.query('SELECT * FROM products LIMIT 9')

    return response.json(AllProducts)
})

router.post('/search', async(request, response)=> {
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
    
    return response.status(200).json({result: result, countPage: countPage.length})
})

router.post('/search/filter-category', async(request, response) => {
    const [result, others] = await sequelize.query(`
        SELECT * FROM categories 
        WHERE category_name 
        iLike '%${ request.body.inputValue.length === 0 ? '' : request.body.inputValue }%'
    `)

    return response.status(200).json({ result })
})

router.post('/register', async(request, response) => {
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

            return response.json({user})
        }
    })
})

router.post('/login', async(request, response) => {
    const {email, password} = request.body

    var [user] = await sequelize.query(`SELECT * FROM clients WHERE email = '${email}'`)

    console.log(user)

    if (user.length === 0) {
        return response.json({ error: "Não existe nenhuma conta associada a este email." })
    } else {
        const match = await bcrypt.compare(password, user[0].password)

        if (match)
            return response.json({ id: user[0].id })
        else
            return response.json({ error: 'Senha Incorreta' })
    }
})

router.post('/get-user', async(request, response) => {
    const { type, id } = request.body

    if (type && type === 'header') {
        const [user] = await sequelize.query(`SELECT * FROM clients WHERE id = ${id}`)
        return response.json({userName: user[0].user_name, photo_profile: user[0].profile_photo})
    }

})

router.post('/likes', async(request, response) => {
    try {
        const {idUser, idProduct} = request.body

        var [result] = await sequelize.query(`
            SELECT clients.id AS userId, products.id AS productId FROM clients
            INNER JOIN userliked_product ON clients.id = userliked_product.id_user
            INNER JOIN products ON products.id = userliked_product.id_product_like
            WHERE userliked_product.id_user = ${idUser} AND userliked_product.id_product_like = ${idProduct}
        `)
        console.log('length: ', result.length)
        if (result.length === 0)
            return response.json({ like: false })

        return response.json({ like: true })

        console.log(result)
    }
    catch(error) {
        return response.json({ error: "Erro interno, por favor tente novamente mais tarde. Error: "+error })
        console.log(error)
    }
})

router.post('/new-like', async(request, response) => {
    try {
        const {idUser, idProduct, type} = request.body

        if (type === 'like') {
            var [result] = await sequelize.query(`
                INSERT INTO userliked_product (id_user, id_product_like) VALUES (${idUser}, ${idProduct})
            `)
            return response.json({ ok: "ok" })

        } else if (type === 'dislike') {
            var [result] = await sequelize.query(`
                DELETE FROM userliked_product where id_user = ${idUser} and id_product_like = ${idProduct}
            `)
            return response.json({ ok: "ok" })
            
        } else {
            return response.json({ error: "Erro interno, por favor tente novamente mais tarde. Error: "+type })
        }
    }
    catch(error) {
        return response.json({ error: "Erro interno, por favor tente novamente mais tarde. Error: "+error })
        console.log(error)
    }
})

router.post('/profile', async(request, response) => {
    try {
        const { id } = request.body

        var [result] = await sequelize.query(`SELECT * FROM clients WHERE id = ${id}`)

        console.log('result: ', result)
        if (result.length === 0) {
            return response.json({ error: "erro ao procurar usuario, tenta novamente mais tarde" })
        } else {        
            return response.json({ result: result[0] })
        }
    }
    catch(error) {
        return response.json({ error: "erro ao procurar usuario, tenta novamente mais tarde. Error: "+error })
    }
})

var storage = multer.diskStorage({
  destination: async (request, file, callback) => {
    //await sequelize.query
    callback(null, '../frontend/src/pages/userProfile/profile-images/')
  },
  filename: (request, file, callback) => {
    callback(null, file.originalname)
  }
})
var upload = multer({ storage: storage }).single('image-profile')

router.post('/change-profile-photo', upload, async(request, response) => {
    try {
        await sequelize.query(`UPDATE clients SET profile_photo = '${request.file.originalname}' where id = ${request.body.id}`)

        return response.json({ ok: 'ok' })
    }
    catch(error) {
        return response.json({ error: 'erro interno ao tentar alterar imagem de perfil' })
    }
})

module.exports = router
