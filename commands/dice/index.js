var debug = require("debug")('discord-sailors')

var message = function(bot, message) {
  var s = message.content.split(' ')

  if(s.length != 4) {
  	bot.reply(message, "Invalid input");
  } else {
  		bot.reply(message, '[' + diceThrow(s[2], s[3]) + ']')
  	}
  }
}

var help = function() {
	return "dice xdy:\t lancia un dado con 'x' facce 'y' volte"
}

var diceThrow = function(number, size) {
  if(number < 0 || size < 0) {
    return "Invalid Input"
  } else {
      var a = []

    if(number < 0 || size < 0) 
      return ''

    for(var i = 0; i < number; i++) {
      a.push(Math.floor((Math.random() * size) + 1))
    }
    return a.join(', ')
  } 
}

module.exports = {
	message: message,
	help: help
};
