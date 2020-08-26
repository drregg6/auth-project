const User = require('../models/User');
const assert = require('assert'); // provided by mocha

describe('Create Users', () => {
  it('should create a user in the db', async () => {
    const user = new User({ username: 'user', password: 'password' });
    try {
      await user.save();
      assert(!user.isNew);
    } catch (error) {
      console.error(error);
    }
  });
});