// server.js

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Import and use the todos router
const todosRouter = require('./routes/todos');
app.use('/todos', todosRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
