import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getUser } from '../../actions/user';

const Profile = ({
  getUser,
  auth: { currentUser, isLoading },
  user: { user }
}) => {
  useEffect(() => {
    if (currentUser !== null) {
      getUser(currentUser.username);
    }
  }, [isLoading]);
  return (
    <div>
      <h1>Profile for { user !== null && user.username }</h1>
    </div>
  )
}

Profile.propTypes = {
  getUser: PropTypes.func.isRequired,
  auth: PropTypes.object,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
});

export default connect(
  mapStateToProps,
  { getUser }
)(Profile);