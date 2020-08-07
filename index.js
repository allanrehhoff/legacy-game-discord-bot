require('dotenv').config();

const Discord = require("discord.js");
const Command = require("./commands");

var bot = new Discord.Client;

bot.login(process.env.BOT_TOKEN);

bot.on("ready" , function() {
	console.log("[BOT] Logged in as: " + bot.user.tag);
});

bot.on("message", function(msg) {
	var args = [];

	if(msg.author.tag == bot.user.tag) return;

	if(msg.channel.type == "dm") {
		msg.channel.send("Error! This channel is not a server... ABORTING.");
		return;
	}

	msg.mentions.users.each((mention, key) => {
		if(mention.username == bot.user.username && mention.bot == true) {
			args = msg.content.split(" ");
		}
	});

	if(args.length > 0) {
		if(typeof args[1] == "undefined") {
			msg.channel.send("Krzzt! Invalid system request, empty message... PROCESS TERMINATED.");
		}

		var cmd = args[1].toLowerCase();

		if(Command.exists(cmd)) {
			try {
				Command.get(cmd).execute(msg, args);
			} catch (error) {
				console.error("[ERR] " + error);
				msg.channel.send('Krzzt! Command failed... PROCESS TERMINATED.');
			}
		}
	}
});