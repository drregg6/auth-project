const User = require('../models/User');
const assert = require('assert');

describe('Update a user', () => {
  let user;
  beforeEach(async () => {
    user = await new User({ username: 'user', password: 'password' });
    await user.save();
  });

  it('should update the user\'s name', async () => {
    user = await User.findOneAndUpdate(
      { username: 'user' },
      {$set: {username: 'user1'}},
      { new: true }
    );
    assert(user.username === 'user1');
  });
});