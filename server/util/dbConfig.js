const Sequelize = require('sequelize')
require('dotenv').config()
const {DATABASE_CONNECTION_STR} = process.env

const db = new Sequelize(
  DATABASE_CONNECTION_STR,
   {
      dialect: "postgres",
      logging: false,
      dialectOptions: {
         ssl: {
            require: true,
            rejectUnauthorized: false,
         }
      }
   }
)

module.exports = db