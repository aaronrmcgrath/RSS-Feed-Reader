// SERVER

'use strict'

// imports dependencies and setup http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json()), // creates express http server
  port = process.env.PORT || 2300,
  dotenv = require('dotenv'),
  log = require('./logger.js');

  // install by 'npm install dotenv' if it's required/used in project
  dotenv.config({
    path: './.env'
  });

// Routes //

//var index = require('./routes/index.js');

// postgresql db setup example: http://www.javascriptpoint.com/nodejs-postgresql-tutorial-example/
// from another file/template, saving in case html/front end added later
//app.use(express.static('server/public'));

// routes and server connection

app.use(bodyParser.urlencoded({extended: false}));

//app.use('/', index);

// server //
// sets server port and logs messages on success
app.listen(port, () => log.message(`rss-feed-reader server is listening on port: ${port} \n`));

module.exports = app;
