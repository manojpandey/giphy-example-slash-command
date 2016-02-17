var key = require('../utils/key');
var sync = require('synchronize');
var request = require('request');
var _ = require('underscore');

// contains the developer access token
var ACCESS_TOKEN = require('../utils/token.js');

// The Type Ahead API.
module.exports = function(req, res) {
  var term = req.query.text.trim();

  var response;
  // Calls bitly API to get the object data
  try {
    response = sync.await(request({
      url: 'https://api-ssl.bitly.com/v3/shorten',
      qs: {
        longUrl: term,
        access_token: ACCESS_TOKEN
      },
      json: true
    }, sync.defer()));
  } catch (e) {
    res.status(500).send('Error');
    return;
  }
  
  if (response.statusCode !== 200 || !response.body || !response.body.data) {
    res.status(500).send('Error');
    return;
  }

  var results = [{"title":"<h5>bit.ly service</h5>","text":term}];

  res.json(results);  
};
