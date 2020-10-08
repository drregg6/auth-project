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
    <ol>
      {
        users.map((user) => {
          return (
            <li key={user.id}>
              {user.username}
            </li>
          )
        })
      }
    </ol>
  )
  return (
    <Main>
      <h1 style={{ textAlign: 'left' }}>The Users</h1>
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