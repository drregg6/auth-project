import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Form from 'react-bootstrap/form';
import Button from 'react-bootstrap/button';

import Main from '../layout/Main';
import MyForm from '../layout/MyForm';

import { connect } from 'react-redux';
import { loginUser } from '../../actions/auth';

const Login = ({
  loginUser,
  auth: { isAuthenticated }
}) => {

  const [ form, setForm ] = useState({
    username: '',
    password: ''
  });
  const { username, password } = form;

  const handleChange = (ev) => {
    setForm({
      ...form,
      [ev.target.name]: ev.target.value
    });
  }

  const handleSubmit = (ev) => {
    ev.preventDefault();

    loginUser(form);
    setForm({
      username: '',
      password: ''
    });
  }
  
  if (isAuthenticated) {
    return <Redirect to='/' />
  }

  return (
    <Main mainBackground>
      <MyForm>
        <h1>Login</h1>
        <form onSubmit={(ev) => handleSubmit(ev)}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              id="username"
              value={username}
              onChange={(ev) => handleChange(ev)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              value={password}
              onChange={(ev) => handleChange(ev)}
            />
          </Form.Group>
          <Form.Group className="button-group">
            <Button type="submit">Submit</Button>
          </Form.Group>
          <Form.Text>Need an account? <Link to="/signup">Sign up here.</Link></Form.Text>
        </form>
      </MyForm>
    </Main>
  )
}

Login.propTypes = {
  auth: PropTypes.object,
  loginUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);