import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

const Index = ({
  auth: { isAuthenticated }
}) => {
  return (
    <div className="hero">
      <h1>Welcome to the Homepage</h1>
      <p>Check out our private pages</p>
      { !isAuthenticated ? (
        <Link to="/signup">Sign Up Here ►</Link>
      ) : (
        <p className="welcome">Welcome!</p>
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