var debug = require("debug")('discord-sailors')

var Twitter = require('twitter');
var Stream = require('user-stream');
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
  	case 'track':
  		track(bot, message, s[3])
  		break;
  	case 'untrack':
  		untrack(bot, message, s[3])
  		break;
  	case 'followlist':
  		followList(bot, message)
  		break;
  	case 'tracklist':
  		trackList(bot, message)
  		break;
  	case 'last':
  		last(bot, message, s[3])
  		break;
  	case 'post':
  		post(bot, message, s[3])
  		break;
  	default:
  		bot.reply(message, "Invalid input");
  		break;
  }
}

var help = function() {
	var m = "twitter:\n"
	// m += "\t\t -- twitter follow x:\tfollows the tweets stream of 'x'\n"
	// m += "\t\t -- twitter unfollow x:\tunfollows the tweets stream of 'x'\n"
	m += "\t\t -- twitter track x:\ttracks the tweets stream containing the word 'x'\n"
	m += "\t\t -- twitter untrack x:\tuntracks the tweets stream containting the word 'x'\n"
	m += "\t\t -- twitter last x:\tpost the last tweet of 'x'\n"
	m += "\t\t -- twitter post x:\tpost the last tweet containing 'x'\n"
	// m += "\t\t -- twitter followlist:\treturns the list of followed users"
	m += "\t\t -- twitter tracklist:\treturns the list of tracked words"

	return m
}

var following = []
var followingStreams = {}

var tracking = []
var trackingStreams = {}

var follow = function(bot, message, twitterUser) {
	if(twitterUser) {
		var params = {
			screen_name: twitterUser
		}
		twitterClient.get('users/show', params, function(error, user, response){
			if (!error) {
		    if(user) {
		    	var user_id = user.id_str

		    	var stream_params = {
		    		follow: '807095' 
		    	}
		    	var stream = createStream(stream_params)

		    	stream.on('close', function() {
		    		closeFollowStream(bot, message, twitterUser)
		    	})

		    	stream.on('error', function(error) {
		    		debug('Error: twitter')
		    		debug(error)
		    		closeFollowStream(bot, message, twitterUser)
		    	})

		    	stream.on('data', function(data) {
		    		if(data.text) {
		    			bot.sendMessage(message.channel, 'Pimmi', {}, function(err, msg) {
			    			if(err) {
			    				debug('Error: twitter - failed to send message: ' + err)
			    			}
		    			})
		    		}
		    	})

		    	followingStreams[twitterUser] = stream
					following.push(twitterUser)
		    	bot.reply(message, "Following " + twitterUser);
		    }
		  } else {
		  	bot.reply(message, "Failed to retrieve user");
		  }
		})
	} else {
		bot.reply(message, "Username is not valid");
	}
}

var unfollow = function(bot, message, twitterUser) {
	if(twitterUser) {
			closeFollowStream(bot, message, twitterUser)
	} else {
		bot.reply(message, "Username is not valid");
	}
}

var track = function(bot, message, word) {
	if(word) {
		var stream_params = {
			track: word 
		}
		
		var stream = createStream(stream_params)

  	stream.on('close', function() {
  		closeTrackStream(bot, message, word)
  	})

  	stream.on('error', function(error) {
  		debug('Error: twitter')
  		debug(error)
  		closeTrackStream(bot, message, word)
  	})

  	stream.on('data', function(data) {
  		if(data.text) {
  			bot.sendMessage(message.channel, data.text, {}, function(err, msg) {
    			if(err) {
    				debug('Error: twitter - failed to send message: ' + err)
    			}
  			})
  		}
  	})

  	trackingStreams[word] = stream
		tracking.push(word)
  	bot.reply(message, "Tracking " + word);
	} else {
		bot.reply(message, "Input is not valid");
	}
}

var untrack = function(bot, message, word) {
	if(word) {
			closeTrackStream(bot, message, word)
	} else {
		bot.reply(message, "Input is not valid");
	}
}

var followList = function(bot, message) {
	bot.reply(message, "Following: [" + following.join(', ') + "]" )
}

var trackList = function(bot, message) {
	bot.reply(message, "Tracking: [" + tracking.join(', ') + "]" )
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

var post = function(bot, message, word) {
	if(word) {
		var params = {
			q: word,
			result_type: 'mixed',
			count: 1
		};

		twitterClient.get('search/tweets', params, function(error, search, response){
		  if (!error) {
		  	var tweets = search.statuses
		    if(tweets.length > 0) {
		    	var t = tweets[0]
		    	var m = t.text + "\n\n"

		    	if(t.entities.urls.url) {
		    		m += "URL: " + t.entities.urls.url
		    	}

		    	bot.reply(message, m);
		    } else {
		    	bot.reply(message, "No tweets");
		    }
		  } else {
		  	bot.reply(message, "Failed to retrieve tweet");
		  }
		});
	} else {
		bot.reply(message, "Input is not valid");
	}
}

var createStream = function(params) {
	var stream = new Stream({
	  consumer_key: config.plugins.twitter.consumer_key,
	  consumer_secret: config.plugins.twitter.consumer_secret,
	  access_token_key: config.plugins.twitter.access_token_key,
	  access_token_secret: config.plugins.twitter.access_token_secret
	});

	stream.stream(params)

	return stream
}

var closeFollowStream = function(bot, message, user){
	var pos = following.indexOf(user)
	if(pos != -1) {
		following.splice(pos, 1)
		followingStreams[user].destroy()

		bot.sendMessage(message.channel, 'Unfollowed user: ' + user, {}, function(err, msg) {
			if(err) {
				debug('Error: twitter - failed to send message: ' + err)
			}
		})
	}
}

var closeTrackStream = function(bot, message, word){
	var pos = tracking.indexOf(word)
	if(pos != -1) {
		tracking.splice(pos, 1)
		trackingStreams[word].destroy()


		bot.sendMessage(message.channel, 'Untracked: ' + word, {}, function(err, msg) {
			if(err) {
				debug('Error: twitter - failed to send message: ' + err)
			}
		})
	}
}

module.exports = {
	message: message,
	help: help
};
