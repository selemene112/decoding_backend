const express = require('express');
const app = express();
const routeBooks = require('./src/route/route');

app.use(express.json());

app.use('/books', routeBooks);

app.listen(9000, () => {
  console.log(`Server Running On Port 9000`);
});
