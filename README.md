# Discord Sailors
## Are you mad enough?

A discord bot implementation created with [discord.js](https://github.com/hydrabolt/discord.js/ "discord.js").



### Installation

1.	Download the discord-sailors folder.
2.	Run the following command: `npm install`
3.	Create a _config.js_ file in the root folder as follow:

	```
	module.exports = {
		// The email of the discord account the bot will use to connect
		email: 'your email',
		
		// The password associated to the email
		password: 'your password', 	
			
		//plugin configurations
		plugins: {}
	}
	```
4.	Run the following command: `npm start`

---

### Plugin configurations

* Ping: no configuration
* Team: no configuration
* Dice: no configuration
* Twitter: 

	```
	twitter: {
        consumer_key: '123',
        consumer_secret: '123',
        access_token_key: '123',
        access_token_secret: '123'
    }
    ```

* Tumblr:

	```
	tumblr: {
		consumer_key: '123',
		consumer_secret: '123',
		token: '123',
		token_secret: '123'
	}
    ```

---

### Current commands

*	Help
	*	bot help: 
		
		**bot** replies with all available commands
*	Ping
	*	bot ping:
		
		 **bot** replies with the string _pong_
*	Team
	*	bot team **param-number**:
		
		Given the current list of users in the channel (excluding the **bot** itself), **bot** separates the users into **param1-number** evenly splitted teams.
* 	Dice
	*	bot dice **param1** **param2**:
* 	Twitter
	*	bot twitter track **param1**:
	*	bot twitter untrack **param1**:
	*	bot twitter tracklist:
	*	bot twitter last **param1**:
	*	bot twitter post **param1**:
* 	Tumblr
	*	bot tumblr post **params**:

---

### Adding commands

We made the Sailors bot easily extensible. In order to add a new command you need to:

1.	Create a new folder in _commands_. The name must not contain whitespaces.
2.	Create a new file named _index.js_ in the newly created folder. You have to _export_ at least two methods:
	*	message(bot, message): whenever your command is called, the bot will invoke the _message_ function. Add your command functionality here.
	*	help(): whenever the **help** command is called, the bot will invoke the _help_ function in order to create the help string.
	
	You can use the following template:

	```
	var debug = require("debug")('discord-sailors')
	var config = require('../../config');

	var message = function(bot, message) {
  		bot.reply(message, "pong");
	}

	var help = function() {
		return "help string"
	}

	module.exports = {
		message: message,
		help: help
	};
	```
4.	If your command needs configuration, you should define it into _config.js_ under the _plugins_ attribute.