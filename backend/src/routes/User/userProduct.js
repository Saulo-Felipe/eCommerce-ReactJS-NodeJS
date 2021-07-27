const express = require('express')
const userProduct = express.Router()
const sequelize = require('../../database/connect')


userProduct.post('/most-popular-products', async (request, response) => {
	try {
		const [mostPopular] = await sequelize.query(`
			SELECT COUNT(*) AS quantidade, products.product_name, products.id, products.cover, products.price
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
        const {id} = request.body

        var [product] = await sequelize.query(`SELECT * FROM products WHERE id = ${id}`)

        return response.json({result: product[0]})
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

        const [categories] = await sequelize.query(`
            SELECT categories.id FROM products
            INNER JOIN category_product ON products.id = category_product.product_id
            INNER JOIN categories ON categories.id = category_product.category_id
            WHERE products.id = ${ productID }
        `)

        if (categories.length === 0) {

        } else {

            var filterCategories = String(categories.map((category, index) => `categories.id = ${ category.id } ${ index === categories.length - 1 ? '' : 'OR' }` ))
            console.log('Filtros: ', filterCategories)

            var [suggestion] = await sequelize.query(`
                SELECT products.product_name, products.price, products.cover, products.id FROM products
                INNER JOIN category_product ON category_product.product_id = products.id
                INNER JOIN categories ON categories.id = category_product.category_id
                WHERE 
                ${
                    filterCategories.replace(/,/g, " ")
                } 
            `)

            if (suggestion.length === 0) {

            } else {

                return response.json({ result: suggestion})
            }


        }

    }
    catch(error) {
        console.log('\n\n\n=========================| Error |=====================\n', error)
        return response.json({ error: "Erro interno, por favor tente novamente mais tarde." }) 
    }

})


module.exports = userProduct