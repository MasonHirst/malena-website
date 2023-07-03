const allCamps = [
  {
    title: 'Improv Camp',
    shortDescription: 'Come join us for a fun three day comedy camp, culminating in a hilarious show!',
    fullDescription: `This will be a hilariously awesome three day camp culminating in a short, yet fun, performance. We'll learn about comedy, acting skills and have a good time! Throughout the camp kids will gain confidence in front of a crowd and learn to work as a team. On the 12th, we will welcome family and friends to come enjoy a fun show!`,
    otherInfo: `For performance and learning purposes, we may split into smaller age groups throughout the camp.`,
    picUrl:
      'https://images.squarespace-cdn.com/content/v1/6115c116ac61bd0e4fcfb626/1629696826600-2V9UKSI1ECDYCMJ9Y5YH/Kids+Having+Fun+After+School+Activity+Theater+Improv++Mockingbird+Improv+Children.JPG',
    startDate: 'July 10',
    endDate: 'July 12',
    times: '9am - 12:30pm',
    ageRange: [8, 18],
    location: `Pleasant Grove, UT`,
    perCost: 75,
    href: 'improv-camp',
    needGuardianSignup: true,
    active: true,
  },
  {
    title: 'Art Camp',
    shortDescription: 'Get creative as we explore art mediums from fingerpainting to graphite!',
    fullDescription: `Come for an exhilarating three day art course that combines creativity, exploration, and fun. In this dynamic class, we'll delve into a variety of art mediums and techniques to inspire and challenge every participant. From fingerpainting and canvases, to graphite pencil and paper, we'll explore a wide range of artistic expressions.`,
    otherInfo: ``,
    picUrl:
      'https://images.unsplash.com/photo-1609618992870-f519a360482e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fHBlbmNpbCUyMGRyYXdpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    startDate: 'July 26',
    endDate: 'July 28',
    times: '9am - 1pm',
    ageRange: [10, 18],
    perCost: 125,
    location: `Pleasant Grove, UT`,
    href: 'art-camp',
    needGuardianSignup: true,
    active: true,
  },
  {
    title: 'Partner Paint Night',
    shortDescription: "Bring your date and I'll bring mine! We'll create a partner painting across two canvases. No experience needed!",
    fullDescription: `Bring your date and I'll bring mine, because this is going to be a fun-filled date night like no other! Collaborate with your partner to create a unique artwork over two canvases. With lively music, expert guidance, and a playful atmosphere, bring home a whimsical artwork to cherish. No experience needed – just bring your enthusiasm and get ready for an unforgettable evening of art, laughter, and connection.`,
    otherInfo: `For any of you who worry about art skill, I've asked my husband, who doesn't usually paint, to come join us. :)`,
    picUrl:
      'https://paintings.pinotspalette.com/birds-date-night-hdtv.jpg?v=10037860',
    startDate: 'July 21',
    endDate: 'July 21',
    times: '7pm - 9pm',
    ageRange: [16, 100],
    perCost: 15,
    location: `Pleasant Grove, UT`,
    href: 'partner-paint-night',
    needGuardianSignup: false,
    active: true,
  },
]

const seed = async () => {
  const SummerCamp = require('../models/summerCamp')
  await SummerCamp.bulkCreate(allCamps)
}

module.exports = seed
