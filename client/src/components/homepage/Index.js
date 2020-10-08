import React from 'react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div
      style={{
        width: '100vw',
        background: 'yellow',
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <h1>Welcome to the Homepage</h1>
      <p>Check out our private pages</p>
      <Link
        to="/signup"
        style={{
          border: '2px double black',
          padding: '7px 10px',
          fontSize: '14px',
          color: 'black'
        }}
      >Sign Up Here ►</Link>
    </div>
  )
}

export default Index;