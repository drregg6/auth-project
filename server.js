/*

TODOs
= New Users tests
    - Only logged in users can access update and delete routes
= Go over logging in and auth routes

*/
const path = require('path');
const app = require('./config/app');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});