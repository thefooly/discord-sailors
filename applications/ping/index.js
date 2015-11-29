var debug = require("debug")('discord-sailors')

var message = function(bot, message) {
  bot.reply(message, "pong");
}

var help = function() {
	return "ping: risponde con pong"
}

module.exports = {
	message: message,
	help: help
};
