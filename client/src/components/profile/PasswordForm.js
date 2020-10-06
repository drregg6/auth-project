import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
      <h2>Change Password</h2>
      <form onSubmit={(ev) => handleSubmit(ev)}>
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Current Password"
          onChange={(ev) => handleChange(ev)}
        />
        <input
          type="password"
          name="newPassword"
          value={newPassword}
          placeholder="New Password"
          onChange={(ev) => handleChange(ev)}
        />
        <input
          type="password"
          name="repeatPassword"
          value={repeatPassword}
          placeholder="Repeat New Password"
          onChange={(ev) => handleChange(ev)}
        />
        <input type="submit" value="Submit" />
      </form>
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