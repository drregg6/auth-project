import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/button';

import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Footer = ({
  auth: { isAuthenticated },
  logout
}) => {
  return (
    <footer>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/users">Users</Link></li>
          <li><Link to="/private">Private</Link></li>
          { isAuthenticated ? (
            <>
              <li><Link to="/profile">Profile</Link></li>
              <Button onClick={() => logout()}>Logout</Button>
            </>
          ) : (
            <>
              <li><Link to="/signup">Sign Up</Link></li>
              <li><Link to="/login">Login</Link></li>
            </>
          )}
        </ul>
      </div>
      <div>
        &copy;{new Date().getFullYear()} <a href="https://github.com/drregg6" target="_blank" rel="noopener noreferrer">Dave Regg</a>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  auth: PropTypes.object,
  logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Footer);