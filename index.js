let debug = require("debug")("discord-sailors");
let Discord = require("discord.js");
let config = require("./config");

let bot = new Discord.Client();
let applications = require("./commands");

bot.on("message", function (message) {
  let m = message.content.split(" ");
  if (m[0] === "bot") {
    switch (m[1]) {
      case "help":
        helpMessage(this, message);
        break;
      default:
        let replied = false;
        for (let i in applications) {
          if (m[1] == i) {
            applications[i].message(this, message);
            replied = true;
          }
        }
        if (!replied) {
          bot.reply(message, "Non capisco");
        }
        break;
    }
  }
});

bot.login(config.email, config.password, function (err) {
  if (err) {
    debug("Login failed");
  } else {
    debug("Login successful");
  }
});

function helpMessage(bot, message) {
  let m = "\nPuoi utilizzare i seguenti comandi:\n";
  m += "\t - help:\t mostra la lista dei comandi\n";
  for (let i in applications) {
    m += "\t - " + applications[i].help() + "\n";
  }
  bot.reply(message, m);
}
