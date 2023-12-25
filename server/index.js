//! Imports
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const path = require('path')
const db = require('./util/dbConfig')
const seed = require('./util/seed')
const Signup = require('./models/signup')
const Class = require('./models/class')
const OneTimeCode = require('./models/oneTimeCode')
const StaffAccount = require('./models/staffAccount')

//! Middleware
const join = path.join(__dirname, '.', 'build')
app.use(express.static(join))
app.use(express.json())
app.use(cors())

//! Relationships
Class.hasMany(Signup, { foreignKey: 'class_id' })
Signup.belongsTo(Class, { foreignKey: 'class_id' })
OneTimeCode.belongsTo(StaffAccount, { foreignKey: 'staff_account_id' })
StaffAccount.hasMany(OneTimeCode, { foreignKey: 'staff_account_id' })

//! Endpoints
const {
  handleClassSignup,
  getActiveClasses,
  getClass,
} = require('./controllers/signupController')
const {
  loginStaff,
  createStaffAccount,
  findStaffAccount,
  validateToken,
  sendPasswordResetEmail,
  validateOneTimeCode,
  changeStaffPassword,
} = require('./controllers/authController')
const {
  getAllClasses,
  createNewClass,
  editExistingClass,
  getAllSignups,
  updateSignupPaidStatus,
  deleteClassSignup,
  deleteClassById,
} = require('./controllers/staffController')

// Unprotected endpoints
app.post('/api/class-signup', handleClassSignup)
app.get('/api/get/classes', getActiveClasses)
app.get('/api/get/classes/:classId', getClass)
app.post('/api/staff/login', loginStaff)
app.post('/api/staff/signup', createStaffAccount)
app.post('/api/staff/forgot-password', sendPasswordResetEmail)
app.put('/api/staff/reset-password', changeStaffPassword)

// Protected endpoints
app.get('/api/staff/me', validateToken, findStaffAccount)
app.get('/api/staff/classes/all', validateToken, getAllClasses)
app.post('/api/staff/classes/create', validateToken, createNewClass)
app.put('/api/staff/classes/update', validateToken, editExistingClass)
app.get('/api/staff/get/signups', validateToken, getAllSignups)
app.put('/api/staff/signup/update/paid', validateToken, updateSignupPaidStatus)
app.delete(
  '/api/staff/signup/delete/:signupId',
  validateToken,
  deleteClassSignup
)
app.delete('/api/staff/classes/delete/:classId', validateToken, deleteClassById)

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
    app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT ${PORT}`))
  })
  .catch((err) => console.log(err))
