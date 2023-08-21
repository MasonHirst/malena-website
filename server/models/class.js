const db = require('../util/dbConfig')
const { DataTypes, FLOAT } = require('sequelize')
const shortid = require('shortid');

const { STRING, INTEGER, BOOLEAN } = DataTypes

const Class = db.define('class', {
  id: {
    type: STRING,
    defaultValue: shortid.generate,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  title: { type: STRING, allowNull: false },
  short_desc: { type: STRING(1000), allowNull: true },
  full_desc: { type: STRING(1000), allowNull: true },
  other_info: STRING,
  pic_url: STRING(1000),
  start_date: STRING,
  end_date: STRING,
  start_time: STRING,
  end_time: STRING,
  min_age: INTEGER,
  max_age: INTEGER,
  location: STRING,
  per_cost: FLOAT,
  href: STRING,
  need_guardian_signup: { type: BOOLEAN, defaultValue: true },
  active: { type: BOOLEAN, defaultValue: true },
  auto_show_by_date: { type: BOOLEAN, defaultValue: true },
  class_type: STRING,
  soft_deleted: { type: BOOLEAN, defaultValue: false },
})

module.exports = Class
