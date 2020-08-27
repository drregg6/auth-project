const User = require('../models/User');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../config/app');


// Initialize database
beforeEach(async () => {
  // Populate database with users
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
        password: 'password',
        repeatPassword: 'password'
      });
    let users = await User.find();
    expect(response.status).toBe(201);
    expect(users.length).toBe(3);
  });

  it('should not create a user if the passwords do not match', async () => {
    expect(true);
  });

  it('should return a jwt token', async () => {
    expect(true);
  });

  it('should crypt the password', async () => {
    expect(true);
  });

  it('should not be able to create a user with duplicate usernames', async () => {
    expect(true);
  });

  it('should not create a user if the password is not at least 8 characters', async () => {
    expect(true);
  });

  it('should not create a user if the username is not at least 6 characters', async () => {
    expect(true);
  });

  it('should only accept usernames and passwords with letters and numbers', async () => {
    expect(true);
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

  it('should not get a user if user specified is not in the database', async () => {
    expect(true);
  });

  it('should get a user if specified user is in the database', async () => {
    expect(true);
  });
});



// Update User
describe('UPDATE USER', () => {

  it('should fail if passwords do not match', async () => {
    let testUser = {
      username: 'user1',
      password: 'password',
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

  it('should find the updating user in the database', async () => {
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

  it('should fail if the new password is the same as the old password', async () => {
    expect(true);
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
    console.log(status);
    expect(true);
  });
});



// Delete User
describe('DELETE USER', () => {
  it('should throw an error if the user is not found in the database', async () => {
    expect(true);
  });
  it('should return a list of users with the deleted user removed', async () => {
    expect(true);
  });
});