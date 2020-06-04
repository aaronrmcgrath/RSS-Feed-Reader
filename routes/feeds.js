// Feeds that routes the calls

'use strict'

const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json()),
  dotenv = require('dotenv'),
  feedsRoute = express.Router(),
  path = require('path'),
  //vhost = require("vhost"),
  Feeds = require('../feedsParser.js'),
  reader = require('feed-reader'),
  fetch = require('node-fetch'),
  log = require('../logger.js');

var feeds = new Feeds();
var feedList = [];
var feedResponse;

setTimeout(() => {
  log.message('Feeds route waiting');
  //feedList = feed.feedsList;
  //log.message(`feeds.js Feed List: '${feed.feedsList[0]}'`);
  feeds.feedsList.forEach((feed, i) => {
    log.message(`Fetching Feed ${feed.id}: Name: '${feed.feedName}', URL: '${feed.feedURL}'`);
    feedList.push(feed.feedURL);
  });
}, 1000);

feedsRoute.get('/', function (request, response) {
  log.message('Made it to feeds.get');
  log.message(`Sending feedList: '${feedList}'`);
  feedResponse = [];
  log.message(`feedResponse before getting feeds:\r\n${feedResponse}`);
  feedList.forEach((feedURL, i) => {
    fetchFeed(feedURL, function(parsedFeed){
      log.message(`parseFeed: ${parsedFeed}`);
      if (parsedFeed != null) {
        log.message('pushing feed to the response!')
        feedResponse.push(parsedFeed)
      }
    });
  });
  setTimeout(() => {
    log.message(`feedResponse after getting feeds before sending to client:\r\n${feedResponse}`);
    response.send(feedResponse);
  }, 3000);
});

function fetchFeed(feedURL, callback) {
  var sRes;
  var wasSuccessful = false;
  reader.parse(feedURL)
  .then((feed) => {
    log.message(feed);
    log.message(feed.title);
    //log.message(feed.entries);
    //log.message(feed.entries[0]);
    sRes = feed;
    wasSuccessful = true;
  }).catch((err) => {
    log.message(err);
  }).finally(() => {
    log.message('Everything done');
    if(wasSuccessful) {
      log.message('returning successful for fetching feed')
      callback(sRes);
    } else {
      log.message('returning null for fetching feed -- error --')
      callback(null);
    }
  });
}

/*
function fetchFeed(feedURL) {
  var sRes = "";
  fetch(feedURL)
  .then(response => response.text())
  //.then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  .then(data => {
    log.message(data);
    const items = data.querySelectorAll("item");
    let html = ``;
    items.forEach(el => {
      log.message(el);
      html += `
        <article>
          <img src="${el.querySelector("link").innerHTML}/image/large.png" alt="">
          <h2>
            <a href="${el.querySelector("link").innerHTML}" target="_blank" rel="noopener">
              ${el.querySelector("title").innerHTML}
            </a>
          </h2>
        </article>
      `;
    });
    //document.body.insertAdjacentHTML("beforeend", html);
    sRes += html;
  });
  return sRes;
}
*/
module.exports = feedsRoute;
