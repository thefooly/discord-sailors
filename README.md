# Discord Sailors
## Are you mad enough?

A discord bot implementation created with [discord.js](https://github.com/hydrabolt/discord.js/ "discord.js").

---

### Installation

1. Download the discord-sailors folder.
2. Run the following command:
	npm install
3. Create a _config.js_ file in the root folder as follow:

	module.exports = {
		email: 'your email', // The email of the discord account the bot will use to connect
		password: 'your password', // The password associated to the email
		plugins: {}
	}
4. Run the following command:
	npm start

---

### Adding commands

We made the Sailors bot easily extensible. In order to add a new command you need to:
1. Create a new folder in _commands_. The name *must not* contain whitespaces.
2. Create a new file named _index.js_ in the newly created folder. This is the initial template of your newly created command:
	var debug = require("debug")('discord-sailors')
	var config = require('../../config');

	// Whenever in chat someone writes "bot 'CommandFolderName'", the message is passed to this function automatically
	var message = function(bot, message) {
	  bot.reply(message, "pong");
	}

	// Whenever in chat someones write "bot help", the bot will use this function to create the help string
	var help = function() {
		return "help string"
	}

	module.exports = {
		message: message,
		help: help
	};
3. Add any functionality you need to the file you created, _module.exports_ has to defined at least _message_ and _help_ attributes as functions.
4. If the new command needs any configuration, you should defined the config into the _config.js_ file in the root folder under the plugins attributes. Example with the _twitter_ command:
	plugins: {
		twitter: {
			consumer_key: 'wVn3O5lqSGz89x259pkmO1ymj',
			consumer_secret: 'ZCmUsrGrjgKZvImDqKl8Om4FAMFRgn9ZjptYHNGfjwQsGX2dz9',
		  access_token_key: '707246287-mrRScO8x46VuS1pAsMOqTNlzSd3usWecJDbPLFDy',
		  access_token_secret: 'nyDzIqtDcGZvqOerzdYm338WvnNmZMyYzVPbe15gIW6RO'
		}
	}
5. Have fun!
