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
		if(this.roleIsAllowed(args[2]) == false) {
			msg.channel.send("Krzzt! Invalid system request, role cannnot be assigned... PROCESS TERMINATED.");
		} else {
			var hasRole = msg.member.roles.cache.find((role) => role.name == args[2]);

			try {
				if(hasRole !== undefined) {
					msg.member.roles.remove(hasRole, "Role removed by bot");
					msg.author.send("Ding Ding! Role removed... PROCESS COMPLETED");
				} else {
					var addRole = msg.guild.roles.cache.find((r) => args[2] == r.name);

					if(addRole === undefined) {
						msg.guild.roles.create({
							data: {
								name: args[2],
								color: this.getRoleColor(args[2]),
							}
						})
						.then(function(role) {
							msg.member.roles.add(role);
						});
					} else {
						msg.member.roles.add(addRole);
					}
				}

				msg.author.send("Ding Ding! Role added... PROCESS COMPLETED");
				msg.delete();
			} catch(error) {
				console.log("[ERR] " + error.message);
			}
		}
	}
}