const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config');
const cookieParser = require('cookie-parser');

const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const userRouter = require('./routes/user');

const errorHandler = require('./middlewars/errorHandler')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose.connect(config.db, { useNewUrlParser: true, useCreateIndex: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Połaczone z mongo DB!');
}); 

app.use('/', loginRouter);
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('/', userRouter)
app.use(errorHandler);

if (process.env.NODE_ENV === 'production') {

  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
};

module.exports = app;
