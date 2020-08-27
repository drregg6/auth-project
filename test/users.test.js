const User = require('../models/User');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../config/app');


const user1 = new User({ username: 'user1', password: 'password' });
const user2 = new User({ username: 'user2', password: 'password' });

// initialize database
beforeEach(async () => {
  await User(user1).save();
  await User(user2).save();
});

// drop database after each test
afterEach(async () => {
  await mongoose.connection.collections.users.drop();
});



// Create User
describe('CREATE USER', () => {
  it('should create a user', async () => {
    const response = await request(app).post('/api/users')
      .send({
        username: 'user',
        password: 'password'
      });
    let users = await User.find();
    expect(response.status).toBe(201);
    expect(users.length).toBe(3);
  });
});



// Read User
describe('READ USER', () => {
  it('should get all users', async () => {
    const response = await request(app)
      .get('/api/users');
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('users');
  });
});



// Update User
describe('UPDATE USER', () => {
  it('should fail if passwords do not match', async () => {
    const response = await request(app)
      .put('/api/users/update')
      .send({
        username: user1.username,
        password: user1.password,
        newPassword: 'newPassword',
        repeatPassword: 'pasword'
      });
    let { body, status } = response;
    expect(status).toBe(401);
    expect(body.msg).toBe('Passwords do not match.');
  });
  it('should update a user', async () => {
    const response = await request(app)
      .put('/api/users/update')
      .send({
        username: user1.username,
        password: user1.password,
        newPassword: 'password1',
        repeatPassword: 'password1'
      });
    console.log(response);
  });
});



// Login user
// describe('LOGIN', () => {
//   it('should login a user', async () => {
//     await request(app).post('/api/users/')
//   });
// });