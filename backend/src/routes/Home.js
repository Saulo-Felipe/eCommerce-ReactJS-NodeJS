const express = require('express')
const router = express.Router()
const sequelize = require('../database/connect')

const bcrypt = require('bcrypt')


router.get('/', async (request, response) => {

    var [AllProducts, others] = await sequelize.query('SELECT * FROM products LIMIT 9')

    return response.json(AllProducts)
})

router.post('/search', async (request, response)=> {
    //Filter
        var minPrice = request.body.Filters.minPrice
        var maxPrice = request.body.Filters.maxPrice === 0 ? 1999999 : request.body.Filters.maxPrice

    var pagePositon = request.body.position === 1 ? 0 : request.body.position -1

    if (minPrice >= maxPrice) return response.json({ error: 'Insira uma faixa de preço válida' })

    const [countPage, ot] = await sequelize.query(`SELECT * FROM products WHERE product_name iLIKE '%${request.body.search}%' AND price >= ${minPrice} AND price <= ${maxPrice}`)
    const [result, others] = await sequelize.query(`
        SELECT * FROM products 
        WHERE product_name iLIKE '%${request.body.search}%' 
        AND price >= ${minPrice} 
        AND price <= ${maxPrice} 
        OFFSET ${pagePositon * 9} 
        LIMIT 9
    `)
    
    return response.status(200).json({result: result, countPage: countPage.length})
})

router.post('/search/filter-category', async (request, response) => {
    const [result, others] = await sequelize.query(`
        SELECT * FROM categories 
        WHERE category_name 
        iLike '%${ request.body.inputValue.length === 0 ? '' : request.body.inputValue }%'
    `)

    return response.status(200).json({ result })
})


router.post('/register', async (request, response) => {
    const { name, email, password } = request.body

    const [verifyInfo] = await sequelize.query(`SELECT * FROM users WHERE email = '${email}'`)

    if (verifyInfo && verifyInfo.length > 0) {
        return response.json({ error: "Esse email já pertence a outra conta" })
    }

    bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
            return response.status(401).send({ error: "Error interno" })

        } else  {
            const [user] = await sequelize.query(`INSERT INTO users (user_name, email, password) VALUES ('${name}', '${email}', '${hash}')`)

            return response.json({user})
        }
    })
})

router.post('/login', async(request, response) => {
    const {email, password} = request.body

    var [user] = await sequelize.query(`SELECT * FROM users WHERE email = '${email}'`)

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
        const [user] = await sequelize.query(`SELECT user_name FROM users WHERE id = ${id}`)
        return response.json({userName: user[0].user_name})
    }

})


module.exports = router
