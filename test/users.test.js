const User = require('../models/User');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../config/app');

// Populate database with users
const user1 = new User({ username: 'user1', password: 'password' });
const user2 = new User({ username: 'user2', password: 'password' });

// Initialize database
beforeEach(async () => {
  await User(user1).save();
  await User(user2).save();
});

// Drop database after each test
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
  console.log(user1.password);

  it('should fail if passwords do not match', async () => {
    let testUser = {
      username: user1.username,
      password: user1.password,
      newPassword: 'newPassword',
      repeatPassword: 'pasword'
    };
    const response = await request(app)
      .put('/api/users/update')
      .send(testUser);
    let { body, status } = response;
    expect(status).toBe(401);
    expect(body.msg).toBe('Passwords do not match.');
  });

  it('should contain the user being updated', async () => {
    let testUser = {
      username: 'newUser',
      password: 'password',
      newPassword: 'newPassword',
      repeatPassword: 'newPassword'
    }
    const res = await request(app)
      .put('/api/users/update')
      .send(testUser);
    let { body, status } = res;
    expect(status).toBe(401);
    expect(body.msg).toBe('User not found.');
  });

  it('should update a user', async () => {
    let testUser = {
      username: 'user1',
      password: 'password',
      newPassword: 'password1',
      repeatPassword: 'password1'
    };
    const res = await request(app)
      .put('/api/users/update')
      .send(testUser);
    const { status, body } = res;
    console.log(`user1's password is: ${user1.password}`);
    console.log(status);
  });
});



// Login user
// describe('LOGIN', () => {
//   it('should login a user', async () => {
//     await request(app).post('/api/users/')
//   });
// });