var key = require('../utils/key');
var sync = require('synchronize');
var request = require('request');
var _ = require('underscore');
var BitlyAPI = require('node-bitlyapi');

// contains the developer access token
var ACCESS_TOKEN = require('../utils/token.js');

var Bitly = new BitlyAPI()

Bitly.setAccessToken(ACCESS_TOKEN);

// The API that gives the shortened url using bit.ly
module.exports = function(req, res) {
    var longUrl = req.query.text.trim();
    shortenService(longUrl, req, res);
};

// Calls bitly API to get the object data
function shortenService(url, req, res) {
    var response;
    try {
    	// calling bitly API /v3/shorten
        response = sync.await(Bitly.shorten({
        	longUrl: url
        }, sync.defer()));
        // as response received was not object type
        response = JSON.parse(response);
    } catch (e) {
        res.status(500).send('Error');
        return;
    }

    var data = response["data"]["url"];

    res.json({
        url: data
    });
}
