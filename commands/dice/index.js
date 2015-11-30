var debug = require("debug")('discord-sailors')

var message = function(bot, message) {
  var s = message.content.split(' ')

  if(s.length != 3) {
  	bot.reply(message, "Invalid input");
  } else {
  	var dice = s[2].split('d')

  	if(dice.length != 2) {
  		bot.reply(message, "Invalid input");
  	} else {
  		bot.reply(message, '[' + diceThrow(dice[0], dice[1]) + ']')
  	}
  }
}

var help = function() {
	return "dice xdy:\t lancia un dado con 'x' facce 'y' volte"
}

var diceThrow = function(number, size) {
	var a = []

	if(number < 0 || size < 0) 
		return ''

	for(var i = 0; i < number; i++) {
		a.push(Math.floor((Math.random() * size) + 1))
	}
	return a.join(', ')
}

module.exports = {
	message: message,
	help: help
};
