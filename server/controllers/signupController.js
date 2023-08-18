require('dotenv').config()
const { Op } = require('sequelize')
const { Sequelize } = require('sequelize')
const cloudinary = require('cloudinary')
const Signup = require('../models/signup')
const Class = require('../models/class')
const SibApiV3Sdk = require('sib-api-v3-sdk')
const dayjs = require('dayjs')
const { classNotOver } = require('../utilityFunctions')
const { SEND_IN_BLUE_API_KEY } = process.env

module.exports = {
  handleClassSignup: async (req, res) => {
    try {
      const {
        signerName,
        signerEmail,
        signerPhone,
        participants,
        comments,
        classObj,
      } = req.body
      const newSignup = await Signup.create({
        signer_name: signerName,
        signer_email: signerEmail,
        signer_phone: signerPhone,
        participants,
        comments,
        class_id: classObj.id,
      })
      if (newSignup) {
        sendConfirmEmailToClient(req.body, classObj, {})
        sendConfirmEmailToInstructor(req.body, classObj, {})
      }
      res.status(200).send(newSignup)
    } catch (err) {
      console.error(err)
      res.status(500).send(err)
    }
  },

  getActiveClasses: async (req, res) => {
    try {
      const classes = await Class.findAll({
        where: {
          active: true,
        },
      })
      // if auto_show_by_date is true, only return classes whose end date is today or after today.
      const classesToShow = classes.filter((c) => {
        if (c.auto_show_by_date) {
          if (classNotOver(c.end_date)) {
            return true
          } else {
            return false
          }
        } else {
          return true
        }
      })

      res.status(200).send(classesToShow)
    } catch (err) {
      console.error(err)
      res.status(500).send(err)
    }
  },

  getClass: async (req, res) => {
    const { classId } = req.params
    try {
      const classObj = await Class.findOne({
        where: {
          id: classId,
        },
      })
      res.status(200).send(classObj)
    } catch (err) {
      console.error(err)
      res.status(500).send(err)
    }
  },

  // getClassSignups: async (req, res) => {
  //   const { class_id } = req.params
  //   try {
  //     const signups = await Signup.findAll({
  //       where: {
  //         classId: class_id,
  //       },
  //     })
  //     res.status(200).send(signups)
  //   } catch (err) {
  //     res.status(500).send(err)
  //   }
  // },
}

function sendConfirmEmailToClient(formInfo, classObj, instructor) {
  const instructorName = instructor.name || 'Malena Hirst'
  const instructorEmail = instructor.email || 'malena.hirst@gmail.com'
  const instructorPhone = instructor.phone || '(385) 321-0150'
  const { signerEmail, signerName, signerPhone, participants, comments } =
    formInfo
  try {
    SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey =
      SEND_IN_BLUE_API_KEY

    new SibApiV3Sdk.TransactionalEmailsApi()
      .sendTransacEmail({
        subject: `You signed up for ${classObj.title} through Malena Hirst!`,
        sender: {
          email: 'info@malenahirst.app',
          name: 'Malena Hirst app',
        },
        replyTo: {
          email: instructorEmail,
        },
        to: [{ name: signerName, email: signerEmail }],
        htmlContent: `<html>
        <body>
          <h3>You have successfully signed up for ${classObj.title}!</h3>
          <p>We will send more details to you once the class gets closer</p>
          <br/>
          <h4>This is the info we recieved: </h4>
          <p>Name: ${signerName}</p>
          <p>Email: ${signerEmail}</p>
          <p>Phone: ${signerPhone}</p>
          <p>Participants: </p>
          <ul>
            ${participants.map((p) => {
              return `<li>${p.name} ${p.age && `(${p.age})`}</li>`
            })}
          </ul>
          <p>Comments: ${comments || ''}</p>
          <h4>Instructor:</h4>
          <p>${instructorName}</p>
          <p>${instructorEmail}</p>
          <p>${instructorPhone}</p>
          <h4>Thank you!</h4>
          <br/>
        </body>
      </html>`,
      })
      .then(
        function (data) {},
        function (error) {
          console.error(error)
        }
      )
  } catch (err) {
    console.error(err)
  }
}

function sendConfirmEmailToInstructor(formInfo, classObj, instructor) {
  const instructorName = instructor.name || 'Malena Hirst'
  const instructorEmail = instructor.email || 'malena.hirst@gmail.com'
  const instructorPhone = instructor.phone || '(385) 321-0150'
  const { signerEmail, signerName, signerPhone, participants, comments } =
    formInfo
  try {
    SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey =
      SEND_IN_BLUE_API_KEY

    new SibApiV3Sdk.TransactionalEmailsApi()
      .sendTransacEmail({
        subject: `${signerName} SIGNED UP FOR ${classObj.title}!`,
        sender: {
          email: 'info@malenahirst.app',
          name: 'Malena Hirst app',
        },
        replyTo: {
          email: signerEmail,
        },
        to: [{ name: instructorName, email: instructorEmail }],
        htmlContent: `<html>
        <body>
          <h3>You have a new signup for ${classObj.title}!</h3>
          <br/>
          <h4>This is the info we recieved: </h5>
          <p>Name: ${signerName}</p>
          <p>Email: ${signerEmail}</p>
          <p>Phone: ${signerPhone}</p>
          <p>Participants: </p>
          <ul>
            ${participants.map((p) => {
              return `<li>${p.name} ${p.age && `(${p.age && p.age})`}</li>`
            })}
          </ul>
          <p>Comments: ${comments ? comments : ''}</p>
          <h3>Yay!</h3>
          <h4>Instructor:</h4>
          <p>${instructorName}</p>
          <p>${instructorEmail}</p>
          <p>${instructorPhone}</p>
        </body>
      </html>`,
      })
      .then(
        function (data) {},
        function (error) {
          console.error(error)
        }
      )
  } catch (err) {
    console.error(err)
  }
}
