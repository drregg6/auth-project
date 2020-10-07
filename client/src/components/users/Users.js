import React, {
  useEffect
} from 'react';
import PropTypes from 'prop-types';

import Main from '../layout/Main';

import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/user';

const Users = ({
  fetchUsers,
  user: { users, isLoading }
}) => {
  useEffect(() => {
    fetchUsers();
  }, []);
  
  const render = isLoading ? (
    'Still loading'
  ) : (
    <>
      {
        users.map(user => {
          return (
            <div key={user.id}>
              <h1>{user.username}</h1>
            </div>
          )
        })
      }
    </>
  )
  return (
    <Main>
      { render }
    </Main>
  )
}

Users.propTypes = {
  user: PropTypes.object,
  fetchUsers: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { fetchUsers }
)(Users);