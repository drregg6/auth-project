const User = require('../models/User');
const assert = require('assert');

describe('Delete User', () => {
  let user1;
  let user2;
  beforeEach(async () => {
    user1 = await new User({ username: 'user1', password: 'password' });
    user2 = await new User({ username: 'user2', password: 'password' });
    await user1.save();
    await user2.save();
  });

  it('should delete a user', async () => {
    await User.deleteOne({ username: 'user1' });
    const users = await User.find({});
    assert(users.length === 1);
  });
});