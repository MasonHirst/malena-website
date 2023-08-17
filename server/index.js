//! Imports
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const path = require('path')
const db = require('./util/dbConfig')
const seed = require('./util/seed')
const Signup = require('./models/signup')
const StaffAccount = require('./models/staffAccount')
const Class = require('./models/class')

//! Middleware
const join = path.join(__dirname, '.', 'build')
app.use(express.static(join))
app.use(express.json())
app.use(cors())

//! Relationships
Class.hasMany(Signup)
Signup.belongsTo(Class)

//! Endpoints
const { handleClassSignup, getActiveClasses, getClass } = require('./controllers/signupController')
const { loginStaff, createStaffAccount, findStaffAccount, validateToken } = require('./controllers/authController')
const { getAllClasses, createNewClass } = require('./controllers/staffController')

// Unprotected endpoints
app.post('/api/class-signup', handleClassSignup)
app.get('/api/classes', getActiveClasses)
app.get('/api/classes/:classId', getClass)
app.post('/api/staff/login', loginStaff)
app.post('/api/staff/signup', createStaffAccount)

// Protected endpoints
app.get('/api/staff/me', validateToken, findStaffAccount)
app.get('/api/classes/all', validateToken, getAllClasses)
app.post('/api/classes/create', validateToken, createNewClass)

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
