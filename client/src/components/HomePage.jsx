import React from 'react'
import muiStyles from '../styles/muiStyles'
const { Typography, Button } = muiStyles

const HomePage = () => {
  return (
    <>
      <Typography
        className="large-title-text"
        variant="h3"
        color="primary"
        sx={{ fontWeight: 'bold' }}
      >
        Malena Hirst
      </Typography>
      <Typography variant="subtitle">Private tutor</Typography>
      <div
        style={{
          display: 'flex',
          gap: '15px',
          alignItems: 'center',
          marginTop: '-15px',
        }}
      >
        <Typography>Art</Typography>
        <div style={{ borderRight: '1px solid lightgrey', height: '20px' }} />
        <Typography>Singing</Typography>
        <div style={{ borderRight: '1px solid lightgrey', height: '20px' }} />
        <Typography>Acting</Typography>
        <div style={{ borderRight: '1px solid lightgrey', height: '20px' }} />
        <Typography>Piano</Typography>
      </div>

      <Button
        variant="contained"
        size="100px"
        sx={{
          textTransform: 'none',
          color: 'white',
          width: 250,
          height: 50,
          fontSize: '18px',
          margin: '15px 0',
        }}
      >
        Get in touch
      </Button>

      <img
        style={{ width: '100%', marginTop: '25px' }}
        src="https://images.unsplash.com/photo-1578961140619-896df05b1fd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXJ0JTIwY2xhc3N8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
      />

      <div className="home-page-about-me">
        <Typography sx={{ textTransform: 'uppercase', fontWeight: 'bold', textAlign: 'center' }}>
          Tutoring services in my home
        </Typography>
        <Typography sx={{ width: '100%', maxWidth: '800px'}}>
          My name is Malena Hirst. I graduated from Missouri Western State University in 2014. I received my Bachelor's in Elementary Education. I have my Teaching Certification for grades 1 - 6. I have been an elementary teacher for the past 4 years. I taught in the Cumberland County School District in North Carolina. I then moved back to Kansas City and taught in the North Kansas City School District. Before becoming a teacher, I worked in before and after school childcare for 3 years. Working and educating children is my passion, and I can't in my home. There are dogs and cats present in the home, but they will not be in the room during session.
        </Typography>
      </div>
    </>
  )
}

export default HomePage
