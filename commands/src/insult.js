const https = require('https');

module.exports = {
	getInsultFromAPI: async function(who) {
		var apiUrl = process.env.API_URL;
		var apiKey = process.env.API_KEY;

		var url = apiUrl + '/?action=get-insult' + '&apikey=' + apiKey;

		if(who) {
			url += '&who=' + who;
		}

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
	execute: async function(msg, args) {
		if(msg.channel.nsfw === true) {
			let member = await msg.guild.member(msg.author);
			let displayname = member.nickname ? member.nickname : msg.author.username;

			this.getInsultFromAPI(displayname).then((insult) => {
				msg.channel.send(insult);
			})
		}
	}
}