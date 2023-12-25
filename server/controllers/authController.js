const StaffAccount = require('../models/staffAccount')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const SibApiV3Sdk = require('sib-api-v3-sdk')
const OneTimeCode = require('../models/oneTimeCode')
const { ADMIN_PASS, JWT_SIGNING_SECRET, SEND_IN_BLUE_API_KEY } = process.env

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
      console.log('email: ', email)
      console.log('password: ', password)
      let user = await StaffAccount.findOne({ where: { email } })
      if (!user) return res.status(200).send('No user found with that email')

      let authenticated
      if (user) {
        authenticated = bcrypt.compareSync(password, user.hashed_pass)
        console.log('authenticated: ', authenticated)
        delete user.dataValues.hashedPass
      } 
      // else return res.status(200).send('Incorrect username or password')
      console.log('bro')

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
      if (password.length < 8) return res.status(200).send('password too short')
      if (adminPass !== ADMIN_PASS) {
        return res.status(200).send('incorrect admin password')
      }

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

  sendPasswordResetEmail: async (req, res) => {
    try {
      const { email } = req.body
      const user = await StaffAccount.findOne({ where: { email } })
      const tempCode = Math.floor(100000 + Math.random() * 900000)

      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(JSON.stringify(tempCode), salt)
      
      if (user) {
        console.log('user found')
        await OneTimeCode.create({
          staff_account_id: user.id,
          hashed_code: hash,
        })
      }
      sendPasswordResetEmail(email, tempCode)
      res.status(200).send('request received')
    } catch (err) {
      console.error(err)
      res.status(503).send(err)
    }
  },

  changeStaffPassword: async (req, res) => {
    try {
      const { email, newPassword, tempCode } = req.body
      if (newPassword.length < 8) return res.status(200).send('password too short')
      const validCode = await checkTempCode(tempCode, email)
      console.log('validCode: ', validCode)
      if (!validCode) return res.status(200).send('invalid code')
      // find the staffaccount with that email
      const user = await StaffAccount.findOne({ where: { email } })
      if (!user) return res.status(200).send('no user found')
      // new password cannot match old password
      const passwordIsSame = bcrypt.compareSync(newPassword, user.hashed_pass)
      console.log('passwordIsSame: ', passwordIsSame)

      if (passwordIsSame) return res.status(200).send('password cannot match')

      // hash the new password
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(newPassword, salt)
      // update the user's password
      const updatedAccount = await StaffAccount.update(
        { hashed_pass: hash },
        { where: { id: user.id } }
      )
      console.log('updatedAccount: ', updatedAccount)
      if (updatedAccount[0] === 1) {
        return res.status(200).send('password updated')
      }

      // deleteExpiredOneTimeCodes()
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

async function checkTempCode(tempCode, email) {
  const user = await StaffAccount.findOne({ where: { email } })
  if (!user) return res.status(200).send('no user found')

  const oneTimeCodes = await OneTimeCode.findAll({
    where: { staff_account_id: user.id },
  })

  let validCode = false
  for (let i = 0; i < oneTimeCodes.length; i++) {
    const hashedCode = oneTimeCodes[i].hashed_code
    if (bcrypt.compareSync(tempCode, hashedCode)) {
      // check if the code was created in the last 10 minutes
      // const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000)
      const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000)
      const createdAt = new Date(oneTimeCodes[i].createdAt)
      if (createdAt > tenMinutesAgo) {
        validCode = true
        break
      }
    }
  }
  return validCode
}

async function deleteExpiredOneTimeCodes() {
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000)
  try {
    // Delete rows where createdAt is before tenMinutesAgo
    const deletedRows = await OneTimeCode.destroy({
      where: {
        createdAt: {
          [Op.lt]: tenMinutesAgo,
        },
      },
    })
    console.log(
      `---------------------Cleanup: Deleted ${deletedRows} expired rows.`
    )
  } catch (error) {
    console.error('Cleanup error:', error)
  }
}

function sendPasswordResetEmail(email, oneTimeCode) {
  try {
    SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey =
      SEND_IN_BLUE_API_KEY

    new SibApiV3Sdk.TransactionalEmailsApi()
      .sendTransacEmail({
        subject: `Password reset code for Malena Hirst app`,
        sender: {
          email: 'security@malenahirst.app',
          name: 'Malena Hirst app',
        },
        to: [{ email }],
        htmlContent: `<html>
        <body>
          <h3>A password reset has been requested for <strong>${email}</strong></h3>
          <p>Your temporary code:</p>
          <h4><strong>${oneTimeCode}</strong></h4>
          <p>This code will expire in 10 minutes.</p>
          <p>Do not share this code.</p>
          <p>If you did not request a password reset, we recommend you change your password.</p>
        </body>
      </html>`,
      })
      .then(
        function (data) {},
        function (error) {
          console.error(error)
        }
      )
  } catch (err) {
    console.error(err)
  }
}
