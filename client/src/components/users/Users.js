import React, {
  useEffect
} from 'react';
import PropTypes from 'prop-types';
import CardColumns from 'react-bootstrap/CardColumns';

import Main from '../layout/Main';
import User from './User';

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
    <CardColumns>
      {
        users.map((user) => <User user={user} />)
      }
    </CardColumns>
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