import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';

const Login = (props) => {
  const [ form, setForm ] = useState({
    username: '',
    password: ''
  });

  const handleChange = (ev) => {
    setForm({
      ...form,
      [ev.target.name]: ev.target.value
    });
  }

  const handleSubmit = (ev) => {
    ev.preventDefault();
    console.log(form);
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
            onChange={(ev) => handleChange(ev)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            onChange={(ev) => handleChange(ev)}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  )
}

// Login.propTypes = {

// }

export default Login;