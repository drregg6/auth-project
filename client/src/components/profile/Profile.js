import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Edit from '../../images/edit.png';

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
  }, [isLoading]);
  useEffect(() => {
    if (user !== null) {
      setUserInput({
        username: user.username,
        bio: user.bio
      });
    }
  }, [user])
  let { username, bio } = userInput;

  const handleChange = ev => {
    setUserInput({
      ...userInput,
      [ev.target.name]: ev.target.value
    });
  }
  const handleSubmit = ev => {
    ev.preventDefault();

    toggleEditUsername(false);
    toggleEditBio(false);

    if (userInput.username === user.username &&
      userInput.bio === user.bio) return;
    
    updateUser(userInput);

    setUserInput({
      username: user.username,
      bio: user.bio
    });
  }



  let render = user !== null && (
    <>
      <h1 className="profile-header" style={{ textAlign: 'center' }}>
        Profile for{' '}
          {
            displayEditUsername ? (
              <div className="profile-header-form">
                <form onSubmit={(ev) => handleSubmit(ev)} className="inline-block">
                  <InputGroup>
                    <FormControl
                      type="text"
                      name="username"
                      value={username}
                      onChange={ev => handleChange(ev)}
                    />
                    <InputGroup.Append>
                      <Button
                        variant="outline-primary"
                        onClick={ev => handleSubmit(ev)}
                      >
                        Submit
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </form>
                {' '}<span className="cancel" onClick={() => toggleEditUsername(!displayEditUsername)}>x</span>
              </div>
            ) : (
              user !== null && user.username 
            )} { !displayEditUsername && (
              <img style={{ width: 25, height: 25 }} src={Edit} alt="Edit icon" onClick={() => toggleEditUsername(!displayEditUsername)} />
            )}
      </h1>
      <div className="bio" style={{ textAlign: 'center', margin: '0 auto' }}>
        {
          displayEditBio ? (
            <div className="bio-form">
              <form onSubmit={(ev) => handleSubmit(ev)} className="inline-block">
                <InputGroup>
                  <FormControl
                    type="text"
                    name="bio"
                    value={bio}
                    onChange={ev => handleChange(ev)}
                  />
                  <InputGroup.Append>
                    <Button
                      variant="outline-primary"
                      onClick={ev => handleSubmit(ev)}
                    >
                      Submit
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </form>
              {' '}<span className="cancel" onClick={() => toggleEditBio(!displayEditBio)}>x</span>
            </div>
          ) : (
            user !== null && user.bio
        )} { !displayEditBio && (
          <img style={{ width: 25, height: 25 }} src={Edit} alt="Edit icon" onClick={() => toggleEditBio(!displayEditBio)} />
        )}
      </div>
      <PasswordForm
        username={user.username}
      />
      <div style={{ margin: '0 auto', textAlign: 'center' }}>
        <h2>Warning: You may not undo this action!</h2>
        <Button variant="danger" onClick={() => deleteUser(user.username)}>Delete Account</Button>
      </div>
    </>
  )
  console.log(userInput);
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