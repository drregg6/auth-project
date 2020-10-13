const path = require('path');
const app = require('./config/app');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});