require('dotenv').config();

const Discord = require("discord.js");
var bot = new Discord.Client;

bot.login(process.env.BOT_TOKEN);

bot.on("ready" , function() {
	console.log("[BOT] Logged in as: " + bot.user.tag);
});

bot.on("message", function(msg) {
	var msgArgs = [];
	var allowedRoles = ["Shadress", "Ritual", "Slums", "Dev"];

	if(msg.author.tag == bot.user.tag) return;

	msg.mentions.users.each((mention) => {
		if(mention.username == bot.user.username && mention.bot == true) {
			msgArgs = msg.content.split(" ");
		}
	});

	if(msgArgs.length > 0) {
		if(typeof msgArgs[1] == "undefined") {
			msg.channel.send("Krzzt! Invalid system request, no role submitted... PROCESS TERMINATED.");
		} else if(allowedRoles.includes(msgArgs[1]) == false) {
			msg.channel.send("Brzzt! Invalid system request, role cannnot be assigned... PROCESS TERMINATED.");
		} else {
			// Assign role
		}
	}

	//args = msg.content.match(/(?:[^\s"]+|"[^"]*")+/g);

	/*if(args != null && args.length > 0 && args[0].charAt(0) == "!") {
		var cmd = args[0].substr(1);

		if(Command.exists(cmd)) {
			// Remove wrapping quotation marks from args.
			// But preserve arg indexes
			for(index = 0; index < args.length; ++index) {
				args[index] = args[index].replace(/"/g, '');
			}

			try {
				Command.get(cmd).execute(msg, args);
			} catch (error) {
				console.error("[ERR] " + error);
				msg.channel.send('Ribbit! There was an error trying to execute that command.');
			}
		}
	}
	*/
});