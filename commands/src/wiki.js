module.exports = {
	subcommands: {
		quote: function(msg, args) {
			const www = require('https');
			const cheerio = require('cheerio');

			const pages = [
				"https://wiki.legacy-game.net/index.php?title=Legacy_Quotes/Karma",
				"https://wiki.legacy-game.net/index.php?title=Legacy_Quotes/Staff_Quotes",
				"https://wiki.legacy-game.net/index.php?title=Legacy_Quotes/Friendship",
				"https://wiki.legacy-game.net/index.php?title=Legacy_Quotes/Intelligence",
				"https://wiki.legacy-game.net/index.php?title=Legacy_Quotes/Karma",
				"https://wiki.legacy-game.net/index.php?title=Legacy_Quotes/Power",
				"https://wiki.legacy-game.net/index.php?title=Legacy_Quotes/Violence",
				"https://wiki.legacy-game.net/index.php?title=Legacy_Quotes/Romance",
				"https://wiki.legacy-game.net/index.php?title=Legacy_Quotes/Wealth",
				"https://wiki.legacy-game.net/index.php?title=Legacy_Quotes/Naughtiness",
				"https://wiki.legacy-game.net/index.php?title=Legacy_Quotes/Randomness",
				"https://wiki.legacy-game.net/index.php?title=Legacy_Quotes/IRC_Chat_Quotes"
			];

			var tmpmsg = msg.channel.send("BEEP BEEP... Fetching quote... PROCESS STARTED.");

			// Get random page.
			var page = pages[Math.floor(Math.random() * pages.length)];

			www.get(page, function(response) {
				let html = '';

				response.on("data", (chunk) => { html += chunk; });

				response.on("end", () => {
					const $ = cheerio.load(html);

					let quotes = [];
					$("pre").each(function(i, el) {
						let quote = $(this).text().trim();
						quotes.push(quote);
					});

					let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

					msg.channel.send("```" + randomQuote + "```");

					tmpmsg.then(function(msg) {
						msg.delete();
					});
				});
			}).on("error", function(error) {
				console.log("[ERR] " + error.message);
			});
		}
	},
	execute: function(msg, args) {
		var subcmd = args[2];

		if(typeof this.subcommands[subcmd] !== "undefined") {
			this.subcommands[subcmd](msg, args);
		}
	}
}