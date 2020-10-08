import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/form';
import Button from 'react-bootstrap/button';

import MyForm from '../layout/MyForm';

import { connect } from 'react-redux';
import { updateUser } from '../../actions/user';

const PasswordForm = ({ username, updateUser }) => {
  const [ formInput, setFormInput ] = useState({
    password: '',
    newPassword: '',
    repeatPassword: ''
  });
  const { password, newPassword, repeatPassword } = formInput;

  const handleChange = event => {
    setFormInput({
      ...formInput,
      [event.target.name]: event.target.value
    });
  }
  const handleSubmit = event => {
    event.preventDefault();
    const body = {
      ...formInput,
      username
    }
    console.log(body);
    updateUser(body);
  }

  return (
    <div>
      <MyForm>
        <h1>Change Password</h1>
        <form onSubmit={(ev) => handleSubmit(ev)}>
          <Form.Group>
            <Form.Control
              type="password"
              name="password"
              value={password}
              placeholder="Current Password"
              onChange={(ev) => handleChange(ev)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="password"
              name="newPassword"
              value={newPassword}
              placeholder="New Password"
              onChange={(ev) => handleChange(ev)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="password"
              name="repeatPassword"
              value={repeatPassword}
              placeholder="Repeat New Password"
              onChange={(ev) => handleChange(ev)}
            />
          </Form.Group>
          <Button variant="outline-primary" type="submit">Submit</Button>
        </form>
      </MyForm>
    </div>
  )
}

PasswordForm.propTypes = {
  updateUser: PropTypes.func.isRequired
}

export default connect(
  null,
  { updateUser }
)(PasswordForm);