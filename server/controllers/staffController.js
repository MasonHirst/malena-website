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
      const updatedSignup = await Signup.update({ paid }, {
        where: {
          id: signupId
        }
      })
      res.status(200).send(updatedSignup)
      
    } catch (err) {
      console.error(err)
      res.status(503).send(err)
    }
  },

  deleteClassSignup: async (req, res) => {
    try {
      const { signupId } = req.params
      const deletedSignup = await Signup.destroy({
        where: {
          id: signupId
        }
      })
      res.status(200).send(JSON.stringify(deletedSignup))
    } catch (err) {
      console.error(err)
      res.status(503).send(err)
    }
  },

  deleteClassById: async (req, res) => {
    try {
      const { classId } = req.params
      const deletedClass = await Class.destroy({
        where: {
          id: classId
        }
      })
      res.status(200).send(JSON.stringify(deletedClass))
    } catch (err) {
      console.error(err)
      res.status(503).send(err)
    }
  },
}