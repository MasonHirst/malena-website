const StaffAccount = require('../models/staffAccount')
const Class = require('../models/class');

module.exports = {
  getAllClasses: async (req, res) => {
    try {
      console.log('get all classes')
      const classes = await Class.findAll()
      console.log(['classes'])
      res.status(200).send(classes)
    } catch (err) {
      console.error(err)
      res.status(503).send(err)
    }
  },

  createNewClass: async (req, res) => {
    try {
      const { newClass, userId } = req.body
      const newClassCreated = await Class.create(newClass)
      res.status(200).send(newClassCreated)
      
    } catch (err) {
      console.error(err)
      res.status(503).send(err)
    }
  },
}