const User = require('../models/User');
const assert = require('assert');

describe('Read Users', () => {
  let user;
  beforeEach((done) => {
    user = new User({ username: 'User', password: 'password' });
    user.save()
      .then(() => done());
  });
  it('Read a user: user', (done) => {
    User.findOne({ username: 'User' }).then((foundUser) => {
      assert(user._id.toString() === foundUser._id.toString());
      done();
    }).catch(err => console.log(err));
  });
});