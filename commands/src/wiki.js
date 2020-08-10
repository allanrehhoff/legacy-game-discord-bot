const www = require("follow-redirects").https;
const cheerio = require("cheerio");

module.exports = {
	subcommands: {
		random: function(msg, args) {
			var wikiBase = "https://wiki.legacy-game.net";
			var redirectingUrl = wikiBase + "/index.php?title=Special:RandomRedirect";

			var tmpmsg = msg.channel.send("BEEP BEEP... Calculating randomness... PROCESS STARTED.");

			www.get(redirectingUrl, function(response) {
				var html = '';

				response.on("data", (chunk) => { html += chunk; });

				response.on("end", () => {
					var $ = cheerio.load(html);

					var resultUrl = $("span.redirectText a").attr("href");
					var title = $("span.redirectText a").text();

					msg.channel.send(`
**${title}**
${"-".repeat(title.length)}${"-".repeat(title.length / 2)}

${wikiBase}${resultUrl}`);

					tmpmsg.then(function(msg) {
						msg.delete();
					});
				}).on("error", function(error) {
					console.log("[ERR] " + error.message);
				});;
			});
		},
		quote: function(msg, args) {
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
			var page = pages.random();

			www.get(page, function(response) {
				let html = '';

				response.on("data", (chunk) => { html += chunk; });

				response.on("end", () => {
					var $ = cheerio.load(html);

					let quotes = [];
					$("pre").each(function(i, el) {
						let quote = $(this).text().trim();
						quotes.push(quote);
					});

					let randomQuote = quotes.random();

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
		var subcmd = args[2].toLowerCase();

		if(typeof this.subcommands[subcmd] !== "undefined") {
			this.subcommands[subcmd](msg, args);
		}
	}
}