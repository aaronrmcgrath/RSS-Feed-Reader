// Index that routes the calls

'use strict'

const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json()),
  dotenv = require('dotenv'),
  router = express.Router(),
  path = require('path'),
  feeds = require('./feeds.js'),
  log = require('../logger.js');

//log.message(`feedsList: ${feed.feedsList}`);

// routes
router.use('/feeds', feeds);

// main html page
router.get('/',function (request,response){
    //log.message('Home Page Request'); //\r\nhost: ',request.headers.host,' hostname: ', request.headers.hostname);
    var file = request.params[0] || '/assets/views/index.html';
    var joinedpath = path.join(__dirname, '../public', file);
    response.sendFile(joinedpath);
});

// wild card redirect
router.get('/*', function(request, response){
    response.redirect('/');
});

module.exports = router;
