const localStrategy = require('passport-local').Strategy
const sequelize = require('../database/connect')
const bcrypt = require('bcrypt')


module.exports = function(passport) {
    passport.use(new localStrategy({ usernameField: 'email', passwordField: 'password' }, async(email, password, done) => {

        const [user] = await sequelize.query(`SELECT * FROM clients WHERE email = '${email}'`)

        if (user.length === 0) 
            return done(null, false, { message: "Esse email não pertence a nenhuma conta." })


        bcrypt.compare(password, user[0].password, (error, success) => {
            if (success) {
                console.log('senha correta, salvado user')
                return done(null, user[0])
            } else {
                return done(null, false, { message: 'Senha incorreta' })
            }
        })

    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser(async(id, done) => {
        const [user] = await sequelize.query(`SELECT * FROM clients WHERE id = ${id}`)

        done(null, user[0])
    })

}