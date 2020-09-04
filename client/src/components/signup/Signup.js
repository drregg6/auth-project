import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

const Signup = props => {
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

    console.log(form);
    setForm({
      username: '',
      password: '',
      repeatPassword: ''
    });
  }

  return (
    <div>
      <h1>Signup</h1>
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
          <input
            type="password"
            placeholder="Repeat Password"
            name="repeatPassword"
            id="repeatPassword"
            value={repeatPassword}
            onChange={(ev) => handleChange(ev)}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Submit" />
        </div>
      </form>
      <div className="small-message">
        <small>Already have an account? <Link to="/login">Login here.</Link></small>
      </div>
    </div>
  )
}

// Signup.propTypes = {

// }

export default Signup;