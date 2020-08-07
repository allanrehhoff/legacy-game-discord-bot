module.exports = {
	help: {

wiki: `
wiki
	Available subcommands: quote

	Fetches a random quote from the legacy wiki, for funs and giggles.

	@mention wiki quote
`,

role: `
role
	Available subcommands: Shadress, Ritual, Slums

	Add/remove roles using this format in any channel.

	@mention role Shadress
	@mention role Ritual
	@mention role Slums
`,

character: `
character
	Available subcommands: <player>

	Displays a character card from any given player.

	@mention character Lynx
`,
help: `
help
	Available subcommands: <command>

	Display this help.

	@mention character role
	@mention character wiki
	...
`,
	},
	getHelp: function(cmd) {
		if(typeof this.help[cmd] !== "undefined") {
			let helpmsg = "```" + this.help[cmd] + "```";
			return helpmsg;
		}

		return '';
	},
	getAllHelp: function() {
		let result = "";

		Object.keys(this.help).forEach(cmd => {
			result += ' ' + this.getHelp(cmd);
		});

		return result;
	},
	execute: function(msg, args) {
		if(typeof args[2] != "undefined") {
			var help = this.getHelp(args[2]);
		} else {
			var help = this.getAllHelp(msg);
		}

		msg.channel.send("BRRRR.. Providing Help... PROCESS COMPLETED\n" + help);
	}
}