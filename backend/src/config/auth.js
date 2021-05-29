const localStrategy = require('passport-local')
const User = require('../models/User.js')
const bcrypt = require('bcrypt')


module.exports = function(passport) {

  passport.use(new localStrategy({ userNameField: 'email'}, async(email, password, done) => {
    const user = await User.findAll({where: {email: email}})

    if (!user)
      return done(null, false, {message: "User not found"})

    const match = await bcrypt.compare(password_login, user[0].password)

    if (match)
      return done(null, user)
    else
      return done(null, false, { message: "Inválid password" })
  }))

  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser((id, done) => {
    const user = User.findAll({where: {id: id}})

    done(err, user)
  })
}
