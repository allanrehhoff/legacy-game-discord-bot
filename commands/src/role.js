module.exports = {
	getRoles: function() {
		return {
			"Shadress": {
				"color": "#96ceb4"
			},
			"Ritual": {
				"color": "#ffeead"
			},
			"Slums": {
				"color": "#ff6f69"
			},
			"Dev": {
				"color": "#ffcc5c"
			},
			"Snowcones": {
				"color": "#ffffff"
			}
		}
	},
	roleIsAllowed(role) {
		let roles = this.getRoles();
		return roles[role] !== undefined;
	},
	getRoleColor: function(role) {
		let roles = this.getRoles();
		return roles[role].color || "BLUE";
	},
	execute: function(msg, args) {
		var requestedRole = args[2].toLowerCase().capitalize();

		if(this.roleIsAllowed(requestedRole) == false) {
			msg.channel.send("Krzzt! Invalid system request, role cannnot be assigned... PROCESS TERMINATED.");
		} else {
			var hasRole = msg.member.roles.cache.find((role) => role.name == requestedRole);

			try {
				if(hasRole !== undefined) {
					msg.member.roles.remove(hasRole, "Role removed by bot");
					msg.author.send("Ding Ding! Role removed... PROCESS COMPLETED");
				} else {
					var addRole = msg.guild.roles.cache.find((r) => requestedRole == r.name);

					if(addRole === undefined) {
						msg.guild.roles.create({
							data: {
								name: requestedRole,
								color: this.getRoleColor(requestedRole),
							}
						})
						.then(function(role) {
							msg.member.roles.add(role);
						});
					} else {
						msg.member.roles.add(addRole);
					}

					msg.author.send("Ding Ding! Role added... PROCESS COMPLETED");
				}

				msg.delete();
			} catch(error) {
				console.log("[ERR] " + error.message);
			}
		}
	}
}