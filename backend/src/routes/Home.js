const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
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
    const [result, others] = await sequelize.query( 
       `SELECT * FROM products 
        WHERE product_name iLIKE '%${request.body.search}%' 
        AND price >= ${minPrice} 
        AND price <= ${maxPrice} 
        OFFSET ${pagePositon * 5} 
        LIMIT 5`
    )
    
    return response.status(200).json({result: result, countPage: countPage.length})
})

router.post('/search/filter-category', async (request, response) => {
    const [result, others] = await sequelize.query(`SELECT * FROM categories WHERE category_name iLike '%${ request.body.inputValue.length === 0 ? '%%' : request.body.inputValue }%'`)

    return response.status(200).json({ result })
})


router.post('/register', (request, response) => {
    const { name, email, password } = request.body

    bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
            return response.status(401).send({ error: "Error interno" })

        } else  {
            const user = await User.create({ name: name, email: email, password: hash })

            return response.json({user})
        }
    })
})

router.post('/login', async(request, response) => {
    const user = request.body
    const userDataBase = await User.findAll({where: {email: user.email}})

    if (userDataBase.length === 0) {
        console.log("Este Usuário não existe")
    } else {
        const match = await bcrypt.compare(user.password, userDataBase[0].password)

        if (match) {
            // If match
        } else
            console.log("Senha incorreta")
    }
})


module.exports = router
