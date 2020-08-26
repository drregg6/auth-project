// helper functions for tests
const connectDb = require('../config/db');
const mongoose = require('mongoose');
// Needed when using ES6 Promises
mongoose.Promise = global.Promise;


before((done) => {
  // Setup connection to the database
  // connect to db
  connectDb();
  // .once and .on are Promises used for databases
  mongoose.connection
    .once('open', () => {
      console.log('Connected');
      done();
    })
    .on('error', (error) => console.log(error))
});

beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    done();
  });
});

after(done => {
  mongoose.connection.collections.users.drop(() => {
    done();
  });
})