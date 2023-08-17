const StaffAccount = require('../models/staffAccount')
const Class = require('../models/class');
const Signup = require('../models/signup');

module.exports = {
  getAllClasses: async (req, res) => {
    try {
      const classes = await Class.findAll()
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

  editExistingClass: async (req, res) => {
    try {
      const { editedClass, userId } = req.body
      const classToEdit = await Class.findOne({
        where: {
          id: editedClass.id
        }
      })
      const updatedClass = await classToEdit.update(editedClass)
      res.status(200).send(updatedClass)
    } catch (err) {
      console.error(err)
      res.status(503).send(err)
    }
  },

  getAllSignups: async (req, res) => {
    try {
      const { userId } = req.body

      const signups = await Signup.findAll()
      res.status(200).send(signups)
      
    } catch (err) {
      console.error(err)
      res.status(503).send(err)
    }
  },

  updateSignupPaidStatus: async (req, res) => {
    try {
      const { paid, signupId } = req.body
      console.log(paid, signupId)
      
    } catch (err) {
      console.error(err)
      res.status(503).send(err)
    }
  },
}