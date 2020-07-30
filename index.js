const Config = process.env;
const Discord = require("discord.js");

let bot = new Discord.Client;

bot.login(Config.BOT_TOKEN);

bot.on("ready" , function() {
	console.log("[BOT] Logged in as: " + bot.user.tag);
});