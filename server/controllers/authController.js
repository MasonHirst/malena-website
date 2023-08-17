const StaffAccount = require('../models/staffAccount')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { ADMIN_PASS, JWT_SIGNING_SECRET } = process.env

function signAccessToken(claims) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      claims,
      JWT_SIGNING_SECRET,
      { algorithm: 'HS256' },
      (error, token) => {
        if (error) reject(error)
        else resolve(token)
      }
    )
  })
}

function verifyAccessToken(token) {
  return new Promise((resolve, reject) => {
    if (!token) throw new Error('token is required')
    jwt.verify(token, JWT_SIGNING_SECRET, (error, data) => {
      if (error) reject(error)
      else resolve(data)
    })
  })
}

module.exports = {
  validateToken: async (req, res, next) => {
    try {
      const accessToken = req.headers.authorization
      const { sub } = await verifyAccessToken(accessToken)
      if (!sub) return res.status(401).send('bro, your access token is no good')
      if (!accessToken)
        return res.status(401).send('where is your access token bro?')
      req.body.userId = sub
      next()
    } catch (err) {
      console.log(err)
      res.status(401).send(err)
    }
  },

  loginStaff: async (req, res) => {
    try {
      const { email, password } = req.body
      console.log(email, password)

      let user = await StaffAccount.findOne({ where: { email } })
      if (!user) return res.status(200).send('No user found with that email')

      let authenticated
      if (user) {
        authenticated = bcrypt.compareSync(password, user.hashed_pass)
        delete user.dataValues.hashedPass
      } else return res.status(200).send('Incorrect username or password')

      
      if (authenticated && user) {
        const accessToken = await signAccessToken({ sub: user.id })
        return res.status(200).send({
          accessToken,
          user,
        })
      } else return res.status(200).send('incorrect username or password')
    } catch (err) {
      console.error(err)
      res.status(503).send(err)
    }
  },

  createStaffAccount: async (req, res) => {
    try {
      const { name, email, password, adminPass } = req.body
      if (adminPass !== ADMIN_PASS)
        return res.status(200).send('incorrect admin password')

      let user = await StaffAccount.findOne({ where: { email } })
      if (user) return res.status(200).send('email already in use')

      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(password, salt)

      const newStaffAccount = await StaffAccount.create({
        name,
        email,
        hashed_pass: hash,
        full_power: true,
      })

      if (newStaffAccount) {
        const accessToken = await signAccessToken({ sub: newStaffAccount.id })
        return res.status(200).send({
          accessToken,
          user: newStaffAccount,
        })
      } else {
        return res.status(200).send('error creating account')
      }
    } catch (err) {
      console.error(err)
      res.status(503).send(err)
    }
  },

  findStaffAccount: async (req, res) => {
    try {
      const { userId } = req.body
      const { authorization } = req.headers

      const user = await StaffAccount.findOne({ where: { id: userId } })
      res.status(200).send({
        accessToken: user ? authorization : null,
        user,
        error: authorization && !user ? 'invalid token' : null,
      })
    } catch (err) {
      console.error(err)
      res.status(503).send(err)
    }
  },
}
