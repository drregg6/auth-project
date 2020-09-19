import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Nav = ({
  auth: { isAuthenticated, user },
  logout
}) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        { isAuthenticated && (
          <>
            <li>Welcome</li>
            <li><button onClick={() => logout()}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  )
}

Nav.propTypes = {
  auth: PropTypes.object,
  logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { logout }
)(Nav);