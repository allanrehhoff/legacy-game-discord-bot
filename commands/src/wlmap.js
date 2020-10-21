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
	getMap: async function() {
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
		var wlimg = this.getMap().then((result) => {
			msg.channel.send({
				files: [result]
			}).then(() => {
				var removeDir = this.modules.path.dirname(result);
				this.modules.fs.rmdirSync(removeDir, {recursive: true});
			});
		});
	}
}