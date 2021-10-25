const express = require('express')
const userProduct = express.Router()
const sequelize = require('../../database/connect')

userProduct.post('/most-popular-products', async (request, response) => {
	try {

		const [mostPopular] = await sequelize.query(`
			SELECT COUNT(*) AS quantidade, products.product_name, products.id, products.cover, products.price, products.description, sale, "oldPrice", "createdAt"
			FROM products
			INNER JOIN userliked_product ON products.id = userliked_product.id_product_like
			INNER JOIN clients ON userliked_product.id_user = clients.id
			GROUP BY products.product_name, products.id, products.cover, products.price
			ORDER BY quantidade DESC
			LIMIT 10
		`)

		return response.json({ mostPopular: mostPopular })
	}
	catch(error) {
        console.log('\n\n\n=========================| Error |=====================\n', error)
        return response.json({ error: 'Error ao listar cliente.' })		
	}
})

userProduct.post('/product', async(request, response) => {
    try {
        const { id } = request.body
        var [product] = await sequelize.query(`SELECT * FROM products WHERE id = ${id}`)

        return response.json({result: product[0]})
    }
    catch(error) {
        console.log('\n\n\n=========================| Error |=====================\n', error)
        return response.json({ error: 'Error ao listar cliente.' })
    }
})

userProduct.post('/all-categories', async(request, response) => {
    try {
        var [result] = await sequelize.query('SELECT * FROM categories')

        return response.json({ result: result })
    }
    catch(error) {
        console.log('\n\n\n=========================| Error |=====================\n', error)
        return response.json({ error: 'Error ao listar cliente.' })
    }
})

userProduct.post('/get-categories-of-product', async(request, response) => {
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


userProduct.post('/product-suggestion', async (request, response) => {
    try {
        const { productID } = request.body

        var [categoryId] = await sequelize.query(`
            SELECT categories.id FROM products
            INNER JOIN category_product ON products.id = category_product.product_id
            INNER JOIN categories ON categories.id = category_product.category_id
            WHERE products.id = ${ productID }
        `)
        
        if (categoryId.length === 0) {
            return response.json({ result: [] })
        }

        var [result] = await sequelize.query(`
            SELECT * FROM products
            INNER JOIN category_product ON products.id = category_product.product_id
            INNER JOIN categories ON categories.id = category_product.category_id
            WHERE categories.id = ${categoryId[0].id}        
        `)

        return response.json({ result })
    }
    catch(error) {
        console.log('\n\n\n=========================| Error |=====================\n', error)
        return response.json({ error: "Erro interno, por favor tente novamente mais tarde." }) 
    }

})

userProduct.post('/rating', async(request, response) => {
    try {
        const { productID } = request.body

        var [result] = await sequelize.query(`
            SELECT clients.profile_photo, clients.user_name, clients.id, rating.comment, rating.rating, rating.comment_data
            FROM rating 
            INNER JOIN clients ON rating.id_user = clients.id 
            INNER JOIN products ON rating.id_product = products.id 
            WHERE products.id = ${ productID }
        `)

        if (result.length === 0) {
            return response.json({ result: [] })
        } else {
            return response.json({ result: result })
        }
    }
    catch(error) {
        console.log('\n\n\n=========================| Error |=====================\n', error)
        return response.json({ error: "Erro interno, por favor tente novamente mais tarde." })         
    }
})

userProduct.post('/new-rating', async(request, response) => {
    try {
        const { comment, userID, productID } = request.body

        var data = new Date()

        var [result] = await sequelize.query(`
            INSERT INTO rating (id_product, id_user, comment, rating, comment_data)
            VALUES (${productID}, ${userID}, '${comment.comment}', ${comment.rating}, '${data.toLocaleDateString()}')
        `)

        return response.json({ ok: true })
    }
    catch(error) {
        console.log('\n\n\n=========================| Error |=====================\n', error)
        return response.json({ error: "Erro interno, por favor tente novamente mais tarde." })         
    }

})

userProduct.post('/cart-products', async (request, response) => {
    try {
        const { userID } = request.body

        var [result] = await sequelize.query(`
            SELECT products.id, product_name,  price, cover, description FROM products
            INNER JOIN cart_user ON cart_user.product_id = products.id
            INNER JOIN clients ON clients.id = cart_user.user_id
            WHERE clients.id = ${ userID }
        `)

        return response.json({ result })
    }
    catch(error) {
        console.log('\n\n\n=========================| Error |=====================\n', error)
        return response.json({ error: "Erro interno, por favor tente novamente mais tarde." })         
    }

})

userProduct.post('/verify-product-cart', async(request, response) => {
    try {
        const { userID, productID } = request.body

        var [result] = await sequelize.query(`
            SELECT products.id FROM products
            INNER JOIN cart_user ON cart_user.product_id = products.id
            INNER JOIN clients ON clients.id = cart_user.user_id
            WHERE clients.id = ${ userID } AND products.id = ${ productID }            
        `)

        if (result.length === 0) return response.json({ inside: false })

        else response.json({ inside: true })
    }
    catch(error) {
        console.log('\n\n\n=========================| Error |=====================\n', error)
        return response.json({ error: "Erro interno, por favor tente novamente mais tarde." })         
    }
})

userProduct.post('/new-cart-product', async (request, response) => {
    try {

        var { userID, productID } = request.body

        await sequelize.query(`
            INSERT INTO cart_user (user_id, product_id) VALUES (${userID}, ${productID})
        `)

        return response.json({ success: true })

    }
    catch(error) {
        console.log('\n\n\n=========================| Error |=====================\n', error)
        return response.json({ error: "Erro interno, por favor tente novamente mais tarde." })         
    }
})

userProduct.post('/remove-cart-product', async(request, response) => {
    try {
        var { userID, productID } = request.body

        await sequelize.query(`
            DELETE FROM cart_user WHERE user_id = ${ userID } AND product_id = ${ productID }
        `)

        return response.json({ success: true })

    }
    catch(error) {
        console.log('\n\n\n=========================| Error |=====================\n', error)
        return response.json({ error: "Erro interno, por favor tente novamente mais tarde." })         
    }

})


module.exports = userProduct