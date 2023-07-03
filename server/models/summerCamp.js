const db = require('../util/dbConfig')
const { DataTypes, Sequelize } = require('sequelize')

const { STRING, INTEGER, ARRAY, JSON, BOOLEAN } = DataTypes

const SummerCamp = db.define('summer_camp', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  title: { type: STRING, allowNull: false, unique: true },
  shortDescription: { type: STRING(1000), allowNull: true },
  fullDescription: { type: STRING(1000), allowNull: true },
  otherInfo: STRING,
  picUrl: STRING,
  startDate: STRING,
  endDate: STRING,
  times: STRING,
  ageRange: { type: ARRAY(DataTypes.INTEGER), allowNull: true },
  location: STRING,
  perCost: INTEGER,
  href: STRING,
  needGuardianSignup: { type: BOOLEAN, defaultValue: true },
  active: { type: BOOLEAN, defaultValue: true },
})

module.exports = SummerCamp
