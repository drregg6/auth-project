const router = require('../routes/api/users');
const User = require('../models/User');
const chai = require('chai');

// Assertion style
chai.should();

// Connect with server
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Users API', () => {
  before(async () => {
    // populate database
    let user1 = new User({ username: 'user1', password: 'password' });
    let user2 = new User({ username: 'user2', password: 'password' });
    try {
      await user1.save();
      await user2.save();
    } catch (error) {
      console.error(error.message);
    }
  });

  // Read Route
  describe('GET /routes/api/users', () => {
    it('should get all the users in the database', (done) => {
      chai.request(router)
        .get('/')
        .end((err, response) => {
          if (err) return console.error(err.message);
          console.log(`Response is: ${response}`);
          // response.should.have.status(200);
          response.body.should.be.a('array');
          response.body.length.should.be.eq(2);
          done();
        });
    });
  });

  // Create Route



  // Update Route



  // Delete Route
});