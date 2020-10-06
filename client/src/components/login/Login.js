import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

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
    <div>
      <h1>Login</h1>
      <form onSubmit={(ev) => handleSubmit(ev)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            name="username"
            id="username"
            value={username}
            onChange={(ev) => handleChange(ev)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            value={password}
            onChange={(ev) => handleChange(ev)}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Submit" />
        </div>
      </form>
      <div className="small-message">
        <small>Need an account? <Link to="/signup">Signup here.</Link></small>
      </div>
    </div>
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