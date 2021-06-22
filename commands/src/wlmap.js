const https = require('https');

module.exports = {
	modules: {
		fs: require("fs"),
		path: require("path"),
		crypto: require("crypto"),
	},
	getOverlay: function() {
		let v = Math.random().toString().substr(2);
		return "https://www.legacy-game.net/maps/map1_overlay.png?v=" + v;
	},
	getBackground: function() {
		let v = Math.random().toString().substr(2);
		return "https://www.legacy-game.net/maps/map1_gang.png?v=" + v;
	},
	getMapFromApi: async function(timeframe) {
		var apiUrl = process.env.API_URL;
		var apiKey = process.env.API_KEY;

		var url = apiUrl + '/?action=get-image' + '&timeframe=' + timeframe + '&apikey=' + apiKey;

		const res = await new Promise(resolve => {
			https.get(url, resolve);
		});

		let data = await new Promise((resolve, reject) => {
			let data = '';
			res.on('data', chunk => data += chunk);
			res.on('error', err => reject(err));
			res.on('end', () => resolve(data));
		});

		data = JSON.parse(data);

		return data.message;
	},
	getMapFromGameServer: async function() {
		var { createCanvas, loadImage } = require("canvas");
		var canvas = createCanvas(496, 512);
		var ctx = canvas.getContext('2d');

		var overlay = this.getOverlay();
		var background = this.getBackground();

		var localImage1 = await loadImage(background);
		ctx.drawImage(localImage1, 0, 0); 

		var localImage2 = await loadImage(overlay);
		ctx.drawImage(localImage2, 0, 0);

		var imageData = canvas.toDataURL();
		imageData = imageData.replace(/^data:image\/png;base64,/, "");

		if (!this.modules.fs.existsSync("./.tmp")) {		
			this.modules.fs.mkdirSync("./.tmp");
		}

		const tmpdir = this.modules.fs.mkdtempSync("./.tmp/x-1025-");
		const tmpnam = this.modules.crypto.randomBytes(16).toString("hex") + ".png";
		const tmppath = tmpdir + "/" + tmpnam;

		this.modules.fs.writeFileSync(tmppath, imageData, 'base64');
		
		return tmppath;
	},
	execute: function(msg, args) {
		if(args.length > 2) {
			var timeframe = args.slice(2).join(' ');
			this.getMapFromApi(timeframe).then((result) => {
				msg.channel.send(result);
			});
		} else {
			this.getMapFromGameServer().then((result) => {
				msg.channel.send({
					files: [result]
				}).then(() => {
					var removeDir = this.modules.path.dirname(result);
					this.modules.fs.rmSync(removeDir, {recursive: true});
				});
			});
		}
	}
}