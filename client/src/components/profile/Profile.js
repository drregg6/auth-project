import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/button';

import Main from '../layout/Main';
import PasswordForm from './PasswordForm';

import { connect } from 'react-redux';
import {
  getUser,
  deleteUser,
  updateUser
} from '../../actions/user';

const Profile = ({
  getUser,
  deleteUser,
  updateUser,
  auth: { currentUser, isLoading },
  user: { user }
}) => {
  let [ displayEditUsername, toggleEditUsername ] = useState(false);
  let [ displayEditBio, toggleEditBio ] = useState(false);

  let [ userInput, setUserInput ] = useState({
    username: '',
    bio: ''
  });

  useEffect(() => {
    if (currentUser !== null) {
      getUser(currentUser.username);
    }
    if (user !== null) {
      setUserInput({
        username: user.username,
        bio: user.bio
      })
    }
  }, [isLoading]);
  let { username, bio } = userInput;

  const handleChange = ev => {
    setUserInput({
      [ev.target.name]: ev.target.value
    });
  }
  const handleSubmit = ev => {
    ev.preventDefault();
    updateUser(userInput);
    setUserInput({
      username: user.username,
      bio: user.bio
    });
  }

  let render = user !== null && (
    <>
      <h1 style={{ textAlign: 'center' }}>
        <span onClick={() => toggleEditUsername(!displayEditUsername)}>EDIT</span>
          {
            displayEditUsername ? (
              <form onSubmit={(ev) => handleSubmit(ev)}>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={(ev) => handleChange(ev)}
                />
              </form>
            ) : (
              username !== null && username 
            )} Profile
      </h1>
      <PasswordForm
        username={user.username}
      />
      <div style={{ margin: '0 auto', textAlign: 'center' }}>
        <h2>Warning: You may not undo this action!</h2>
        <Button variant="danger" onClick={() => deleteUser(user.username)}>Delete Account</Button>
      </div>
    </>
  )
  return (
    <Main>
      { render }
    </Main>
  )
}

Profile.propTypes = {
  getUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  auth: PropTypes.object,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
});

export default connect(
  mapStateToProps,
  {
    getUser,
    updateUser,
    deleteUser
  }
)(Profile);