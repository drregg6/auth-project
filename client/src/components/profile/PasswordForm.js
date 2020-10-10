import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/form';
import Button from 'react-bootstrap/button';

import MyForm from '../layout/MyForm';

import { connect } from 'react-redux';
import { updateUserPassword } from '../../actions/user';

const PasswordForm = ({ username, updateUserPassword }) => {
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
    updateUserPassword(body);
  }

  return (
    <div>
      <MyForm inverse>
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
          <Form.Group className="button-group">
            <Button type="submit">Submit</Button>
          </Form.Group>
        </form>
      </MyForm>
    </div>
  )
}

PasswordForm.propTypes = {
  updateUserPassword: PropTypes.func.isRequired
}

export default connect(
  null,
  { updateUserPassword }
)(PasswordForm);