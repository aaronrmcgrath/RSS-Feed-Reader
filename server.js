// SERVER

'use strict'

// imports dependencies and setup http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json()), // creates express http server
  port = process.env.PORT || 2301,
  dotenv = require('dotenv'),
  log = require('./logger.js'),
  index = require('./routes/index.js');

  // install by 'npm install dotenv' if it's required/used in project
  dotenv.config({
    path: './.env'
  });

  log.message(__dirname);

// postgresql db setup example: http://www.javascriptpoint.com/nodejs-postgresql-tutorial-example/
// from another file/template, saving in case html/front end added later
//app.use(express.static('server/public'));

// Routes //
// routes and server connection

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

// index which is the main router
//setTimeout(() => {
app.use('/', index);
  //log.message('Server Waiting');
//}, 250);

// routes and server connection

// example of a subdomain
//app.use(subdomain('subDomain', subDomain));

// server //
// sets server port and logs messages on success
app.listen(port, () => log.message(`rss-feed-reader server is listening on port: ${port} \n`));

module.exports = app;
