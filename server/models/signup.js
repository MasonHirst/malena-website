const shortid = require('shortid')
const db = require('../util/dbConfig')
const { DataTypes } = require('sequelize')

const { STRING, INTEGER, ARRAY, JSON, BOOLEAN } = DataTypes

const Signup = db.define('signup', {
  id: {
    type: STRING,
    defaultValue: shortid.generate,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  signerName: { type: STRING, allowNull: false },
  signerEmail: { type: STRING, allowNull: false },
  signerPhone: { type: STRING, allowNull: false },
  participants: { type: ARRAY(DataTypes.JSON), allowNull: false },
  comments: STRING(1000),
})

module.exports = Signup
