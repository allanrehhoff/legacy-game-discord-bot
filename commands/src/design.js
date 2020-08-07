module.exports = {
    execute: function(msg, args) {
        var charName = args[2]

        msg.channel.send("https://www.legacy-game.net/character.php?p=" + charName)
    }
}