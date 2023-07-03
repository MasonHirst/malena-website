//! Imports
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const path = require('path')
const db = require('./util/dbConfig')
const seed = require('./util/seed')
const SummerCamp = require('./models/summerCamp')
const Signup = require('./models/signup')

//! Middleware
const join = path.join(__dirname, '.', 'build')
app.use(express.static(join))
app.use(express.json())
app.use(cors())

//! Relationships
SummerCamp.hasMany(Signup)
Signup.belongsTo(SummerCamp)

//! Endpoints
const { handleCampSignup, getActiveCamps, getCamp } = require('./controllers/signupController')

// Unprotected endpoints
app.post('/api/summer-camp-signup', handleCampSignup)
app.get('/api/camps', getActiveCamps)
app.get('/api/camps/:camp_name', getCamp)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '.', 'build', 'index.html'))
})

//! Server listen
const PORT = process.env.SERVER_PORT || 8080
db
.sync()
  // .sync({force: true})
  // .then(() => seed())
  .then(() => {
    app.listen(PORT, () =>
      console.log(`SERVER RUNNING ON PORT ${PORT}`)
    )
  })
  .catch((err) => console.log(err))
