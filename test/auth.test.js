const User = require('../models/User');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../config/app');

// Initialize database
beforeEach(async () => {
  await mongoose.connection.collections.users.drop();

  const user1 = new User({
    username: 'user1',
    password: 'password',
    repeatPassword: 'password'
  });
  const user2 = new User({
    username: 'user2',
    password: 'password',
    repeatPassword: 'password'
  });

  await user1.save();
  await user2.save();
});



describe('USER LOGIN', () => {
  it('should return an error message if the password is incorrect', async () => {
    let testUser = {
      username: 'user1',
      password: 'mypassword'
    };
    const res = await request(app)
      .post('/api/auth')
      .send(testUser)
    let { status, body } = res;
    expect(status).toBe(401);
    expect(body.msg).toBe('Incorrect credentials. Please try again.');
  });

  it('should return an error message if the username cannot be found', async () => {
    let testUser = {
      username: 'user12',
      password: 'password'
    };
    const res = await request(app)
      .post('/api/auth')
      .send(testUser)
    let { status, body } = res;
    expect(status).toBe(401);
    expect(body.msg).toBe('Incorrect credentials. Please try again.');
  });

  it('should return a jwt token', async () => {
    let testUser = {
      username: 'user1',
      password: 'password'
    }
    const res = await request(app)
      .post('/api/auth')
      .send(testUser)
    let { status, body } = res;
    expect(status).toBe(200);
    expect(body).toHaveProperty('token');
  });
});