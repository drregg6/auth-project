import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/form';
import Button from 'react-bootstrap/button';

import Main from '../layout/Main';
import MyForm from '../layout/MyForm';

import { connect } from 'react-redux';
import { addUser } from '../../actions/user';

const Signup = ({
  auth: { isAuthenticated },
  addUser
}) => {
  const [ form, setForm ] = useState({
    username: '',
    password: '',
    repeatPassword: ''
  });

  const { username, password, repeatPassword } = form;

  const handleChange = (ev) => {
    setForm({
      ...form,
      [ev.target.name]: ev.target.value
    });
  }

  const handleSubmit = (ev) => {
    ev.preventDefault();

    addUser(form);
    setForm({
      username: '',
      password: '',
      repeatPassword: ''
    });
  }

  if (isAuthenticated) {
    return <Redirect to='/' />
  }

  return (
    <Main mainBackground>
      <MyForm>
        <h1>Sign up</h1>
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
          <Form.Group>
            <Form.Control
              type="password"
              placeholder="Repeat Password"
              name="repeatPassword"
              id="repeatPassword"
              value={repeatPassword}
              onChange={(ev) => handleChange(ev)}
            />
          </Form.Group>
          <Form.Group className="button-group">
            <Button type="submit">Submit</Button>
          </Form.Group>
          <Form.Text>
            Already have an account? <Link to="/login">Login here.</Link>
          </Form.Text>
        </form>
      </MyForm>
    </Main>
  )
}

Signup.propTypes = {
  auth: PropTypes.object
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addUser }
)(Signup);