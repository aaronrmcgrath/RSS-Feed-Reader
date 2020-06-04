// CSV Feeds Parser class and Feeds list for server side urlencoded

'use strict'

const csv = require('csv-parser'),
  fs = require('fs'),
  results = [],
  log = require('./logger.js');

  class Feeds {
    constructor(){
      getCSVResults();
      this.feedsList = results;
    }
  }

function getCSVResults() {
  log.message('About to parse feeds.csvs');
  fs.createReadStream('feeds.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    //console.log(results);
    log.message(`Results: '${results}'`);
  });
}

module.exports = Feeds;
