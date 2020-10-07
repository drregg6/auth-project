import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Main from '../layout/Main';
import PasswordForm from './PasswordForm';

import { connect } from 'react-redux';
import {
  getUser,
  deleteUser
} from '../../actions/user';

const Profile = ({
  getUser,
  deleteUser,
  auth: { currentUser, isLoading },
  user: { user }
}) => {
  useEffect(() => {
    if (currentUser !== null) {
      getUser(currentUser.username);
    }
  }, [isLoading]);
  let render = user !== null && (
    <>
      <h1>{ user !== null && user.username } Profile</h1>
      <PasswordForm
        username={user.username}
      />
      <button onClick={() => deleteUser(user.username)}>Delete Account</button>
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
  auth: PropTypes.object,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
});

export default connect(
  mapStateToProps,
  { getUser, deleteUser }
)(Profile);