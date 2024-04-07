'use strict';

const express = require('express');
const morgan = require('morgan');

const app = express();

const tourRoute = require('./routes/tour_routes');
const userRoute = require('./routes/user_routes');

///=================================Middle wire=======================================

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use(morgan('tiny'));

///============================ Routes ============================

app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);

///========================================Make Server Live=======================================

module.exports = app;
