const express = require('express')
const client = express.Router()
const sequelize = require('../database/connect')
const multer = require('multer')
const path = require('path')
const fs = require('fs')


client.post('/get-user', async(request, response) => {
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

client.post('/product', async(request, response) => {
    try {
        const {id} = request.body

        var [product] = await sequelize.query(`SELECT * FROM products WHERE id = ${id}`)

        return response.json({result: product[0]})
    }
    catch(error) {
        console.log('\n\n\n=========================| Error |=====================\n', error)
        return response.json({ error: 'Error ao listar cliente.' })
    }
})


client.post('/profile', async(request, response) => {
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


client.post('/get-adress', async(request, response) => {
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

client.post('/edit/profile', async(request, response) => {
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

client.post('/change-profile-photo', upload, async(request, response) => {
    try {
        const [profileImage] = await sequelize.query(`SELECT profile_photo FROM clients WHERE id = ${request.body.id}`)
        if (profileImage[0].profile_photo !== "user.png") {
            fs.unlink(path.join(__dirname, `../images/profile-images/${profileImage[0].profile_photo}`), (error) => {
                if (error) console.log('Erro ao deleter imagem...', error)
            })
        }
        await sequelize.query(`UPDATE clients SET profile_photo = '${request.file.originalname}' where id = ${request.body.id}`)

        return response.json({ ok: 'ok' })
    }
    catch(error) {
        console.log('\n\n\n=========================| Error |=====================\n', error)
        return response.json({ error: 'Erro ao alterar imagem de perfil' })
    }
})

client.post('/likes', async(request, response) => {
    try {
        //Pega a quantidade total de likes
        if (request.body.type && request.body.type === "get all likes") {
            const { id } = request.body

            var [result] = await sequelize.query(`SELECT products.id, products.product_name, products.price, products.cover, products.description FROM clients
                INNER JOIN userliked_product ON clients.id = userliked_product.id_user
                INNER JOIN products ON products.id = userliked_product.id_product_like
                WHERE userliked_product.id_user = ${id}
            `)

            for (itemID in result) {
                var [category] = await sequelize.query(`
                    SELECT categories.category_name FROM products
                    INNER JOIN category_product ON category_product.product_id = products.id
                    INNER JOIN categories ON categories.id = category_id
                    WHERE products.id = ${result[itemID].id}
                `)

                category = category.map(item => item.category_name)

                result[itemID].categories = category
            }

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

client.post('/new-like', async(request, response) => {
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

client.post('/get-categories-of-product', async(request, response) => {
    try {
        const { IDs } = request.body

        if (IDs.length !== 0) {

            for (var itemID of IDs) {
                const [result] = await sequelize.query(`
                    SELECT categories.category_name FROM products
                    INNER JOIN category_product ON category_product.product_id = products.id
                    INNER JOIN categories ON categories.id = category_id
                    WHERE products.id = ${itemID}
                `)

                return response.json({ categories: result })
            }
        }
    }
    catch(error) {
        console.log('\n\n\n=========================| Error |=====================\n', error)
        return response.json({ error: "Erro interno, por favor tente novamente mais tarde." })        
    }
})


module.exports = client