const app = require('../app');
const path = require('path');

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
  console.log('Uruchomiano na porcie: ', PORT);
});