const Discord = require('discord.js');

module.exports = {
    run: (message, args, client) => {

        let member = message.mentions.users.first() || message.author

        let avatar = member.displayAvatarURL({size: 1024})


        const embed = new Discord.MessageEmbed()
        .setTitle(`${member.username}'s avatar`)
        .setImage(avatar)
        .setColor("RANDOM")

        message.channel.send(embed);
    },
    name: 'avatar',
    guildOnly: true
}