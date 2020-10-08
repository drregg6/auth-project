import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Background from '../../images/elena-mozhvilo-halloween.jpg';

import { connect } from 'react-redux';

const Index = ({
  auth: { isAuthenticated }
}) => {
  return (
    <div
      style={{
        width: '100vw',
        background: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '84vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <h1>Welcome to the Homepage</h1>
      <p>Check out our private pages</p>
      { !isAuthenticated ? (
        <Link
          to="/signup"
          style={{
            border: '2px double black',
            padding: '7px 10px',
            fontSize: '14px',
            color: 'black'
          }}
        >Sign Up Here ►</Link>
      ) : (
        <p
          style={{
            border: '2px double black',
            padding: '7px 10px',
            fontSize: '14px',
            color: 'black'
          }}
        >
          Welcome!
        </p>
      )}
    </div>
  )
}

Index.propTypes = {
  auth: PropTypes.object
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps
)(Index);