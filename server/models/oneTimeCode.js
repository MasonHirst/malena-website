const shortid = require('shortid')
const db = require('../util/dbConfig')
const { DataTypes } = require('sequelize')

const { STRING } = DataTypes

const OneTimeCode = db.define('one_time_code', {
  id: {
    type: STRING,
    defaultValue: shortid.generate,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  hashed_code: { type: STRING, allowNull: false },
})

module.exports = OneTimeCode
