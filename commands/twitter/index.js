var debug = require("debug")('discord-sailors')

var Twitter = require('twitter');
var config = require('../../config');
 
var twitterClient = new Twitter({
  consumer_key: config.plugins.twitter.consumer_key,
  consumer_secret: config.plugins.twitter.consumer_secret,
  access_token_key: config.plugins.twitter.access_token_key,
  access_token_secret: config.plugins.twitter.access_token_secret
});

var message = function(bot, message) {
  var s = message.content.split(' ')

  switch(s[2]) {
  	case 'follow':
  		follow(bot, message, s[3])
  		break;
  	case 'unfollow':
  		unfollow(bot, message, s[3])
  		break;
  	case 'last':
  		last(bot, message, s[3])
  		break;
  	default:
  		bot.reply(message, "Invalid input");
  		break;
  }
}

var help = function() {
	var m = "twitter:\n"
	m += "\t\t -- twitter follow x:\tfollows the tweets stream of 'x'\n"
	m += "\t\t -- twitter unfollow x:\tunfollows the tweets stream of 'x'\n"
	m += "\t\t -- twitter last x:\tpost the last tweet of 'x'"

	return m
}

var following = {}

var follow = function(bot, message, twitterUser) {
	if(twitterUser) {
		bot.reply(message, "Not yet implemented");
	} else {
		bot.reply(message, "Username is not valid");
	}
}

var unfollow = function(bot, message, twitterUser) {
	if(twitterUser) {
		bot.reply(message, "Not yet implemented");
	} else {
		bot.reply(message, "Username is not valid");
	}
}

var last = function(bot, message, twitterUser) {
	if(twitterUser) {
		var params = {
			screen_name: twitterUser,
			count: 1
		};

		twitterClient.get('statuses/user_timeline', params, function(error, tweets, response){
		  if (!error) {
		    if(tweets.length > 0) {
		    	var t = tweets[0]
		    	var m = t.text + "\n\n"

		    	if(t.entities.urls.url) {
		    		m += "URL: " + t.entities.urls.url
		    	}

		    	bot.reply(message, m);
		    } else {
		    	bot.reply(message, "User doesn't have any tweet associated");
		    }
		  } else {
		  	bot.reply(message, "Failed to retrieve tweet");
		  }
		});
	} else {
		bot.reply(message, "Username is not valid");
	}
}

module.exports = {
	message: message,
	help: help
};
