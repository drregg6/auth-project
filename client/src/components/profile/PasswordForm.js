import React from 'react';
import PropTypes from 'prop-types';

const PasswordForm = (currentPassword) => {
  console.log(currentPassword);
  return (
    <div>
      <h2>Change Password</h2>
      <form>

      </form>
    </div>
  )
}

PasswordForm.propTypes = {
  currentPassword: PropTypes.string
}

export default PasswordForm;