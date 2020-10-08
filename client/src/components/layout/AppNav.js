import React from 'react';
import PropTypes from 'prop-types';
import {
  Nav,
  Button
} from 'react-bootstrap';

import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const AppNav = ({
  auth: { isAuthenticated, currentUser },
  logout
}) => {
  return (
    <Nav className="justify-content-end" as="ul">
      <Nav.Item as="li">
        <Nav.Link href="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link href="/users">Users</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link href="/signup">Sign up</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link href="/login">Login</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link href="/private">Private</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link href="/profile">Profile</Nav.Link>
      </Nav.Item>
      { isAuthenticated && (
        <>
          <li className="nav-link my-nav">Welcome { currentUser && currentUser.username }</li>
          <li className="my-nav-btn"><Button variant="outline-danger" size="sm" onClick={() => logout()}>Logout</Button></li>
        </>
      )}
    </Nav>
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
)(AppNav);