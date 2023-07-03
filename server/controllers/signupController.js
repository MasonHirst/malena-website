require('dotenv').config()
const { Op } = require('sequelize')
const { Sequelize } = require('sequelize')
const cloudinary = require('cloudinary')
const Signup = require('../models/signup')
const SummerCamp = require('../models/summerCamp')
const SibApiV3Sdk = require('sib-api-v3-sdk')
const { SEND_IN_BLUE_API_KEY } = process.env

module.exports = {
  handleCampSignup: async (req, res) => {
    try {
      const {
        signerName,
        signerEmail,
        signerPhone,
        participants,
        comments,
        camp,
      } = req.body
      const newSignup = await Signup.create({
        signerName,
        signerEmail,
        signerPhone,
        participants,
        comments,
        summerCampId: camp.id,
      })
      if (newSignup) {
        sendConfirmEmailToClient(req.body, camp, {})
        sendConfirmEmailToInstructor(req.body, camp, {})
      }
      res.status(200).send(newSignup)
    } catch (err) {
      console.error(err)
      res.status(500).send(err)
    }
  },

  getActiveCamps: async (req, res) => {
    try {
      const camps = await SummerCamp.findAll({
        where: {
          active: true,
        },
      })
      res.status(200).send(camps)
    } catch (err) {
      console.error(err)
      res.status(500).send(err)
    }
  },

  getCamp: async (req, res) => {
    const { camp_name } = req.params
    try {
      const camp = await SummerCamp.findOne({
        where: {
          href: camp_name,
        },
      })
      res.status(200).send(camp)
    } catch (err) {
      console.error(err)
      res.status(500).send(err)
    }
  },

  getCampSignups: async (req, res) => {
    const { camp_id } = req.params
    try {
      const signups = await Signup.findAll({
        where: {
          summerCampId: camp_id,
        },
      })
      res.status(200).send(signups)
    } catch (err) {
      res.status(500).send(err)
    }
  },
}

function sendConfirmEmailToClient(formInfo, camp, instructor) {
  const instructorName = instructor.name || 'Malena Hirst'
  const instructorEmail = instructor.email || 'malena.connole@gmail.com'
  const instructorPhone = instructor.phone || '(385) 321-0150'
  const { signerEmail, signerName, signerPhone, participants, comments } =
    formInfo
  try {
    SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey =
      SEND_IN_BLUE_API_KEY

    new SibApiV3Sdk.TransactionalEmailsApi()
      .sendTransacEmail({
        subject: `You signed up for ${camp.title} through Malena Hirst!`,
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
          <h3>You have successfully signed up for ${camp.title}!</h3>
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

function sendConfirmEmailToInstructor(formInfo, camp, instructor) {
  const instructorName = instructor.name || 'Malena Hirst'
  const instructorEmail = instructor.email || 'malena.connole@gmail.com'
  const instructorPhone = instructor.phone || '(385) 321-0150'
  const { signerEmail, signerName, signerPhone, participants, comments } =
    formInfo
  try {
    SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey =
      SEND_IN_BLUE_API_KEY

    new SibApiV3Sdk.TransactionalEmailsApi()
      .sendTransacEmail({
        subject: `${signerName} SIGNED UP FOR ${camp.title}!`,
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
          <h3>You have a new signup for ${camp.title}!</h3>
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
