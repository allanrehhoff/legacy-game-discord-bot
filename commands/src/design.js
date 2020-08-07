module.exports = {
	execute: function(msg, args) {
		var charName = args[2]

		if (charName.length > 10) {
			msg.channel.send("Krzzt! Invalid system request, account name too long... PROCESS TERMINATED.");
		} else {
			msg.channel.send("https://www.legacy-game.net/character.php?p=" + charName);
		}
	}
}