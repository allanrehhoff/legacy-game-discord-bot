const www = require("follow-redirects").https
const async = require("async");

module.exports = {
	execute: function(msg, args) {
		var imgParts = args.slice(2).map((str) => str.toLowerCase());
		var imgName = imgParts.join(' ');

		var foundImage = false;
		const extensions = [".gif", ".png", ".jpg"];

		async.forEachOf(extensions, (ext) => {
			var imgUrl = "https://legacy-game.net/img-bin/" + imgName;

			if(!imgName.endsWith(ext)) {
				imgUrl += ext;
			}

			imgUrl = encodeURI(imgUrl);

			www.get(imgUrl, function(response) {
				var img = '';

				if(response.statusCode < 400) {
					foundImage = true;
					msg.channel.send(imgUrl);
				}
			})
			.on("error", function(error) {
				console.log("[ERR] " + error.message);
			});
		});
	}
}