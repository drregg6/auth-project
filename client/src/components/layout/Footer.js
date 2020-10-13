import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/button';
import {
  Container,
  Row,
  Col
} from 'react-bootstrap';

import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Footer = ({
  auth: { isAuthenticated },
  logout
}) => {
  return (
    <footer>
      <Container>
        <Row>
          <Col><Link to="/">Home</Link></Col>
          <Col>
            {
              isAuthenticated ? (
                <Link to="/private">Private</Link>
              ) : (
                <Link to="/login">Login</Link>
              )
            }
          </Col>
        </Row>
        <Row>
          <Col><Link to="/users">Users</Link></Col>
          <Col>
            {
              isAuthenticated ? (
                <Link to="/profile">Profile</Link>
              ) : (
                <Link to="/signup">Sign up</Link>
              )
            }
          </Col>
        </Row>
        <Row>
          <Col>
            {
              isAuthenticated ? (
                <Button variant="danger" size="sm" onClick={() => logout()}>Logout</Button>
              ) : (
                <Link to="/private">Private</Link>
              )
            }
          </Col>
        </Row>
      </Container>
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