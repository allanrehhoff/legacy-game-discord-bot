function maybeInsultPosterInAppropriateChannels(msg, args) {
	const Command = require("../commands");

	// Avoid posting double insults
	if(args[1] == "insult") { return; }

	// This check is also done in the insult command itself
	// Because the command can be invoked manually too.
	let channels = process.env.NSFW_CHANNELS.split(',');

	if(channels.indexOf(msg.channel.name) !== -1) {
		let chance = Math.floor(Math.random() * 101);

		if(chance <= process.env.INSULT_CHANCE) {
			Command.get("insult").execute(msg);
		}
	}
}

module.exports = {
	maybeInsultPosterInAppropriateChannels
}