/*

TODOs
= New Users tests
    - Only logged in users can access update and delete routes
= Go over logging in and auth routes

*/

const app = require('./config/app');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});