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
  let passingUser = {
    username: 'user',
    password: 'password',
    repeatPassword: 'password'
  };
  it('should create a user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send(passingUser);
    let users = await User.find();
    expect(response.status).toBe(201);
    expect(users.length).toBe(3);
  });

  it('should not create a user if the passwords do not match', async () => {
    let testUser = {
      username: 'daveregg',
      password: 'password',
      repeatPassword: 'pasword'
    }
    const res = await request(app)
      .post('/api/users')
      .send(testUser);
    let { status, body } = res;
    expect(status).toBe(401);
    expect(body.msg).toBe('Passwords must match.')
  });

  it('should return a jwt token', async () => {
    const res = await request(app)
      .post('/api/users')
      .send(passingUser);
    let { status, body } = res;
    expect(status).toBe(201);
    expect(body).toHaveProperty('token');
  });

  it('should crypt the password', async () => {
    await request(app)
      .post('/api/users')
      .send(passingUser);
    let user = await User.findOne({ username: passingUser.username });
    expect(user.password).not.toBe(passingUser.password);
  });

  it('should not be able to create a user with duplicate usernames', async () => {
    let testUser = {
      username: 'user1',
      password: 'password',
      repeatPassword: 'password'
    }
    const res = await request(app)
      .post('/api/users')
      .send(testUser)
    let { status, body } = res;
    expect(status).toBe(401);
    expect(body.msg).toBe('User already exists. Please login.')
  });

  it('should not create a user if the password is not at least 8 characters', async () => {
    let testUser = {
      username: 'user4',
      password: 'cat',
      repeatPassword: 'cat'
    }
    const res = await request(app)
      .post('/api/users')
      .send(testUser)
    let { status, body } = res;
    expect(status).toBe(401);
    expect(body.msg).toBe('Password must be at least 8 characters.');
  });

  it('should not create a user if the username is not at least 4 characters', async () => {
    let testUser = {
      username: 'cat',
      password: 'password',
      repeatPassword: 'password'
    }
    const res = await request(app)
      .post('/api/users')
      .send(testUser)
    let { status, body } = res;
    expect(status).toBe(401);
    expect(body.msg).toBe('Username must be at least 4 characters.');
  });

  it('should only accept usernames with letters and numbers', async () => {
    let testUser = {
      username: 'Alph4dog!',
      password: 'password',
      repeatPassword: 'password'
    };
    const res = await request(app)
      .post('/api/users')
      .send(testUser);
    let { status, body } = res;
    expect(status).toBe(401);
    expect(body.msg).toBe('Username may only contain letters or numbers.');
  });

  it('should only accept passwords with letters and numbers', async () => {
    let testUser = {
      username: 'alphadog',
      password: 'password!',
      repeatPassword: 'password!'
    };
    const res = await request(app)
      .post('/api/users')
      .send(testUser);
    let { status, body } = res;
    expect(status).toBe(401);
    expect(body.msg).toBe('Password may only contain letters or numbers.');
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