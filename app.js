const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');

app = express();
app.use(bodyParser.json());

app.use((_, __, next) => {
  console.log('connected');
  next();
});

app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
  console.log('logging error: ', error);
  const statusCode = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(statusCode).json({ message: message, data: data});
});

mongoose.connect('mongodb://localhost:27017/mean-users', {useNewUrlParser: true, useUnifiedTopology: true})
.then((_) => {
  app.listen(8080);
})
.catch((error) => {
  console.log(error);
});
