const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

const Routes = require('./routes');
const Settings = require('./settings');

app.use(morgan('dev'));
app.use(Settings.cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//routes
app.use('/auth', Routes.AuthenticationRoutes);

module.exports = app;