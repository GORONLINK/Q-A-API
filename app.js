const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/questionSchemas.js');
const cors = require("cors");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// Get the configuration files
require('./config/config');

const app = express();

app.use(logger('dev'));
app.use('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use('/graphql', cors(), graphqlHTTP({
  schema: schema,
  rootValue: global,
  graphiql: true,
}));

let connectionString = '';
if(process.env.NODE_ENV === 'dev') {
  connectionString = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
} else {
  connectionString = `${process.env.DB_PROD_URL}`;
}

mongoose.connect(connectionString, { promiseLibrary: require('bluebird'), useUnifiedTopology: true, useNewUrlParser: true })
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

module.exports = app;
