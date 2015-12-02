var debug = require("debug")('discord-sailors')

var tumblr = require('tumblr.js');
var config = require('../../config');

var clientTumblr = tumblr.createClient({
  consumer_key: config.plugins.tumblr.consumer_key,
  consumer_secret: config.plugins.tumblr.consumer_secret,
  token: config.plugins.tumblr.access_token_key,
  token_secret: config.plugins.tumblr.access_token_secret
});

var message = function(bot, message) {
  var s = message.content.split(' ')

  switch(s[2]) {
  	case 'post':
  		post(bot, message, s[3])
  		break;
  	default:
  		bot.reply(message, "Invalid input");
  		break;
  }
}

var post = function(bot, message, word) {
	if(word) {
		var params = {
			limit: 1
		}
		clientTumblr.tagged(word, params, function (err, data) {
    	if(data.length > 0) {
    		bot.reply(message, data[0].post_url);
    	} else {
    		bot.reply(message, "Didn't find any post");
    	}
		});
	} else {
		bot.reply(message, "Input is not valid");
	}
}

var help = function() {
	var m = "tumblr:\n"
	m += "\t\t -- tumblr post x:\tpost the last tumblr containing 'x'"

	return m
}
module.exports = {
	message: message,
	help: help
};
