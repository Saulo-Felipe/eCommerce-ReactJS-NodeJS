const express = require('express')
const router = express.Router()
const sequelize = require('../database/connect')
const multer = require('multer')
const bcrypt = require('bcrypt')
const path = require('path')
const passport = require('passport')


router.get('/', async(request, response) => {
    try {
        var [AllProducts, others] = await sequelize.query('SELECT * FROM products LIMIT 9')

        return response.json(AllProducts)
    }
    catch(error) {
        console.log('\n\n\n=========================| Error |=====================\n', error)
        return response.json({ error: "Erro na home principal." })
    }
})

router.get('/teste-login', (request, response) => {
    console.log(request.user)
    response.send(`
        <h1>Login Teste<h1>
        <form action='/login' method='post'>
            <input id="email" name="email" />
            <input id="password" name="password" />
            <button type="submit">Login</button>
        </form>
    `)
})

router.get('/test-redirect-login-true', (request, response) => {
    console.log("request success: ", request.user)
    var teste = request.user

    return response.json({ teste: teste })
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

router.post('/login', async(request, response, next) => {
    try {
        passport.authenticate("local", {
            successRedirect: "/test-redirect-login-true",
            failureRedirect: "/test-redirect-login-false"
        })(request, response, next)
    }
    catch(error) {
        console.log('\n\n\n=========================| Error |=====================\n', error)
        return response.json({ error: "erro ao realizar Login." })
    }
})

router.post('/logout', (request, response) => {
    try {
        request.session.destroy(err => {
            return
        })
    }
    catch(error) {
        console.log('\n\n\n=========================| Error |=====================\n', error)
        return response.json({ error: 'Error ao fazer logout, tente novamente em instantes...' })
    }
})

router.post('/get-user', async(request, response) => {
    try {
        if (request.user)
            return response.json({ user: request.user })
        else
            return response.json({ user: null })
    }
    catch(error) {
        console.log('\n\n\n=========================| Error |=====================\n', error)
        return response.json({ error: 'Error ao listar cliente.' })
    }
})

router.post('/likes', async(request, response) => {
    try {
        //Pega a quantidade total de likes
        if (request.body.type && request.body.type === "get all likes") {
            const { id } = request.body
            var [result] = await sequelize.query(`SELECT products.id, products.product_name, products.price, products.cover FROM clients
            INNER JOIN userliked_product ON clients.id = userliked_product.id_user
            INNER JOIN products ON products.id = userliked_product.id_product_like
            WHERE userliked_product.id_user = ${id}`)

            return response.json({ result: result })
        } else {
            //Verifica se um produto especifico tem um like que veio de um usuario especifico
            const {idUser, idProduct} = request.body

            var [result] = await sequelize.query(`
                SELECT clients.id AS userId, products.id AS productId FROM clients
                INNER JOIN userliked_product ON clients.id = userliked_product.id_user
                INNER JOIN products ON products.id = userliked_product.id_product_like
                WHERE userliked_product.id_user = ${idUser} AND userliked_product.id_product_like = ${idProduct}
            `)
            if (result.length === 0)
                return response.json({ like: false })

            return response.json({ like: true })
        }
    }
    catch(error) {
        console.log('\n\n\n=========================| Error |=====================\n', error)
        return response.json({ error: "Erro interno, por favor tente novamente mais tarde. Error: "+error })
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
        console.log('\n\n\n=========================| Error |=====================\n', error)
        return response.json({ error: "Erro interno, por favor tente novamente mais tarde." })
    }
})

router.post('/profile', async(request, response) => {
    try {
        const { id } = request.body

        var [result] = await sequelize.query(`SELECT * FROM clients WHERE id = ${id}`)

        console.log('result: ', result)
        if (result.length === 0) {
            return response.json({ error: "erro ao procurar usuario." })
        } else {        
            return response.json({ result: result[0] })
        }
    }
    catch(error) {
        console.log('\n\n\n=========================| Error |=====================\n', error)
        return response.json({ error: "erro ao procurar usuario." })
    }
})

var storage = multer.diskStorage({
  destination: async (request, file, callback) => {
    //await sequelize.query
    callback(null, path.join(__dirname, '../images/profile-images/'))
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
        console.log('\n\n\n=========================| Error |=====================\n', error)
        return response.json({ error: 'Erro ao alterar imagem de perfil' })
    }
})

router.post('/get-adress', async(request, response) => {
    try {
        const { id } = request.body
        const [result] = await sequelize.query(`
            SELECT user_name, client_adress.* FROM clients
            INNER JOIN client_adress ON client_adress.client_id = clients.id
            WHERE clients.id = ${id}
        `)
        return response.json({ result: result[0] }) 
    }
    catch(error) {
        console.log('\n\n\n=========================| Error |=====================\n', error)
        return response.json({ error: 'Erro ao pesquisar endereço' })
    }
})

router.post('/edit/profile', async(request, response) => {
    try {
        const { 
            id, user_name, email, phone, cpf, //Update personal information
            street, district, city, state, country, cep, house_number //Update personal adress
        } = request.body

        await sequelize.query(`
            UPDATE clients SET
            user_name = '${user_name}',
            email = '${email}',
            phone = ${phone},
            cpf = ${cpf}
            WHERE id = ${id}
        `)

        await sequelize.query(`
            UPDATE client_adress SET 
            house_number = ${house_number},
            street = '${street}',
            district = '${district}',
            city = '${city}',
            state = '${state}',
            country = '${country}',
            cep = ${cep}
            WHERE client_id = ${id}
        `)
    }
    catch(error) {
        console.log('\n\n\n=========================| Error |=====================\n', error)
        return response.json({ error: 'Erro ao editar clients' })
    }
})


module.exports = router