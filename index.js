var debug = require("debug")('discord-sailors')
var Discord = require("discord.js");

var bot = new Discord.Client();

var userEmail = process.argv[2]
var userPassword = process.argv[3]

var applications = require('./applications');

bot.on("message", function(message){
		var m = message.content.split(' ')
		if(m[0] === 'bot') {
			switch(m[1]) {
				case "help":
					helpMessage(this, message)
					break;
				default:
				 	var replied = false
					for(var i in applications) {
						if(m[1] == i) {
							applications[i].message(this, message)
							replied = true
						}
					}
					if(!replied) {
						bot.reply(message, 'Non capisco')
					}
					break;
			}
		}
});

bot.login(userEmail, userPassword, function(err,token) {
	if(err) {
		debug('Login failed')
	} else {
		debug('Login successful')
	}
});

function stringStartsWith(string, prefix) {
    return string.slice(0, prefix.length) == prefix;
}

function helpMessage(bot, message) {
	var m = "Puoi utilizzare i seguenti comandi: \n\n"
	m += "help: mostra la lista dei comandi\n"
	for(var i in applications) {
		m += applications[i].help() + "\n"
	}
	bot.reply(message, m);
}