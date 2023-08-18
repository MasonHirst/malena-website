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
  signer_name: { type: STRING, allowNull: false },
  signer_email: { type: STRING, allowNull: false },
  signer_phone: { type: STRING, allowNull: false },
  participants: { type: ARRAY(DataTypes.JSON), allowNull: false },
  comments: STRING(1000),
  paid: { type: BOOLEAN, defaultValue: false },
})

module.exports = Signup
