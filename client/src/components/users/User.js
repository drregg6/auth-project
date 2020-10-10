import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/card';

import DefaultUser from '../../images/users/default-user.jpg';

const User = ({ user }) => {
  return (
    <Card key={user.id}>
      <Card.Img src={DefaultUser} />
      <Card.Body>
        <Card.Title>{user.username}</Card.Title>
        <Card.Text>{user.bio ? user.bio : 'Hello world!'}</Card.Text>
      </Card.Body>
    </Card>
  )
}

User.propTypes = {
  user: PropTypes.object
}

export default User;