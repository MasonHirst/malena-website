const allClasses = [
  {
    title: 'Improv Camp',
    short_desc:
      'Come join us for a fun three day comedy camp, culminating in a hilarious show!',
    full_desc: `This will be a hilariously awesome three day camp culminating in a short, yet fun, performance. We'll learn about comedy, acting skills and have a good time! Throughout the camp kids will gain confidence in front of a crowd and learn to work as a team. On the 12th, we will welcome family and friends to come enjoy a fun show!`,
    other_info: `For performance and learning purposes, we may split into smaller age groups throughout the camp.`,
    pic_url:
      'https://images.squarespace-cdn.com/content/v1/6115c116ac61bd0e4fcfb626/1629696826600-2V9UKSI1ECDYCMJ9Y5YH/Kids+Having+Fun+After+School+Activity+Theater+Improv++Mockingbird+Improv+Children.JPG',
    start_date: 'Wed Jul 22 2023 019:00:00 GMT-0600 (Mountain Daylight Time)',
    end_date: 'Wed Jul 24 2023 019:00:00 GMT-0600 (Mountain Daylight Time)',
    start_time: 'Wed Aug 16 2023 09:00:00 GMT-0600 (Mountain Daylight Time)',
    end_time: 'Wed Aug 16 2023 12:30:00 GMT-0600 (Mountain Daylight Time)',
    min_age: 8,
    max_age: 18,
    location: `Pleasant Grove, UT`,
    per_cost: 75,
    href: 'improv-camp',
    need_guardian_signup: true,
    active: true,
    auto_show_by_date: true,
    class_type: 'summer_camp',
  },
  {
    title: 'Art Camp',
    short_desc:
      'Get creative as we explore art mediums from fingerpainting to graphite!',
    full_desc: `Come for an exhilarating three day art course that combines creativity, exploration, and fun. In this dynamic class, we'll delve into a variety of art mediums and techniques to inspire and challenge every participant. From fingerpainting and canvases, to graphite pencil and paper, we'll explore a wide range of artistic expressions.`,
    other_info: ``,
    pic_url:
      'https://images.unsplash.com/photo-1609618992870-f519a360482e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fHBlbmNpbCUyMGRyYXdpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    start_date: 'Wed Jul 16 2023 019:00:00 GMT-0600 (Mountain Daylight Time)',
    end_date: 'Wed Jul 18 2023 019:00:00 GMT-0600 (Mountain Daylight Time)',
    start_time: 'Wed Aug 16 2023 09:00:00 GMT-0600 (Mountain Daylight Time)',
    end_time: 'Wed Aug 16 2023 12:30:00 GMT-0600 (Mountain Daylight Time)',
    min_age: 10,
    max_age: 18,
    per_cost: 125,
    location: `Pleasant Grove, UT`,
    href: 'art-camp',
    need_guardian_signup: true,
    active: true,
    auto_show_by_date: true,
    class_type: 'summer_camp',
  },
  {
    title: 'Partner Paint Night',
    short_desc:
      "Bring your date and I'll bring mine! We'll create a partner painting across two canvases. No experience needed!",
    full_desc: `Bring your date and I'll bring mine, because this is going to be a fun-filled date night like no other! Collaborate with your partner to create a unique artwork over two canvases. With lively music, expert guidance, and a playful atmosphere, bring home a whimsical artwork to cherish. No experience needed – just bring your enthusiasm and get ready for an unforgettable evening of art, laughter, and connection.`,
    other_info: `For any of you who worry about art skill, I've asked my husband, who doesn't usually paint, to come join us. :)`,
    pic_url:
      'https://paintings.pinotspalette.com/birds-date-night-hdtv.jpg?v=10037860',
    start_date: 'Wed Jul 19 2023 019:00:00 GMT-0600 (Mountain Daylight Time)',
    end_date: 'Wed Jul 19 2023 019:00:00 GMT-0600 (Mountain Daylight Time)',
    start_time: 'Wed Aug 16 2023 019:00:00 GMT-0600 (Mountain Daylight Time)',
    end_time: 'Wed Aug 16 2023 21:00:00 GMT-0600 (Mountain Daylight Time)',
    min_age: 16,
    max_age: 100,
    per_cost: 15,
    location: `Pleasant Grove, UT`,
    href: 'partner-paint-night',
    need_guardian_signup: false,
    active: true,
    auto_show_by_date: true,
    class_type: 'class',
  },
]

const seed = async () => {
  const Class = require('../models/class')
  await Class.bulkCreate(allClasses)
}

module.exports = seed
