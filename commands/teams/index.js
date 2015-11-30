var debug = require("debug")('discord-sailors')

var message = function(bot, message) {
  var s = message.content.split(' ')

  if(Number.isInteger(parseInt(s[2]))) {
  	bot.reply(message, 'Le squadre sono: \n\n' + createTeams(bot, s[2]));
  } else {
  	bot.reply(message, "Invalid input");
  }
}

var help = function() {
	return "team x:\t crea 'x' team con le persone presenti online"
}

var createTeams = function(bot, number) {
	if(number <= 0) {
		return ''
	}

	var onlineUsers = []

	for(var i in bot.users) {
		if(bot.users[i].username && bot.users[i].status != 'offline' && bot.users[i].username != 'sailors-bot') {
			onlineUsers.push(bot.users[i].username)
		}
	}

	var teams = {}
	for(var i = 0; i < number; i++) {
		teams[i] = []
	}

	var totalOnlineUsers = onlineUsers.length
	var temp = 0
	for(var i = 0; i < totalOnlineUsers; i++) {
		var randomUser = Math.floor((Math.random() * onlineUsers.length))
		teams[temp].push(onlineUsers[randomUser])
		onlineUsers.splice(randomUser, 1)

		temp++
		if(temp >= number) {
			temp = 0
		}
	}

	var m = ""
	var pos = 1
	for(var i in teams) {
		m += pos + ": " + teams[i].join(', ') + '\n'
		pos++
	}

	return m
}

module.exports = {
	message: message,
	help: help
};
