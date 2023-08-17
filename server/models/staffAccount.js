const shortid = require('shortid')
const db = require('../util/dbConfig')
const { DataTypes } = require('sequelize')

const { STRING, INTEGER, ARRAY, JSON, BOOLEAN } = DataTypes

const StaffAccount = db.define('staff_account', {
  id: {
    type: STRING,
    defaultValue: shortid.generate,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  name: { type: STRING, allowNull: false },
  email: { type: STRING, allowNull: false },
  hashed_pass: { type: STRING, allowNull: false },
  full_power: { type: BOOLEAN, defaultValue: false },
})

module.exports = StaffAccount
