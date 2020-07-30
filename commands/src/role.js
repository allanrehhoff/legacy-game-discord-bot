module.exports = {
	roleIsAllowed(role) {
		let allowedRoles = ["Shadress", "Ritual", "Slums", "Dev"];
		return allowedRoles.includes(role);
	},
	execute: function(msg, args) {
		if(this.roleIsAllowed(args[2]) == false) {
			msg.channel.send("Krzzt! Invalid system request, role cannnot be assigned... PROCESS TERMINATED.");
		} else {
			var hasRole = msg.member.roles.cache.find((role) => role.name == args[2]);

			if(hasRole !== undefined) {
				msg.member.roles.remove(hasRole, "Role removed by bot");

				msg.author.send("Ding Ding! Role removed... PROCESS COMPLETED");
			} else {
				var addRole = msg.guild.roles.cache.find((r) => args[2] == r.name);
				msg.member.roles.add(addRole);

				msg.author.send("Ding Ding! Role added... PROCESS COMPLETED");
			}

			// Don't let people use the bot to spam the server.
			// We've sent a private message to confirm the action.
			msg.delete();
		}
	}
}