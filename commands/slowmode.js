const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
    run: (message, args, client) => {

        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('Tu n\'a pas la permission de  **MANAGE_CHANNELS**!').then(m => m.delete({ timeout: 5000 }));

        if (!args[0]) return message.channel.send('Tu n\'a pas définit de temp!').then(m => m.delete({ timeout: 5000}));

        const currentCooldown = message.channel.rateLimitPerUser;

        const reason = args[1] ? args.slice(1).join(' ') : 'Pas de raison';

        const embed = new MessageEmbed()
            .setFooter(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }));

        if (args[0] === 'off') {

            if (currentCooldown === 0) return message.channel.send('Le slomode est désormais désactiver').then(m => m.delete({ timeout: 5000 }));

            embed.setTitle('SlowMode désactiver')
                .setColor('#00ff00')
            return message.channel.setRateLimitPerUser(0, reason)

        }

        const time = ms(args[0]) / 1000;

        if (isNaN(time)) return message.channel.send('Temp invalide réessay!').then(m => m.delete({ timeout: 5000 }));

        if (time >= 21600) return message.channel.send('La durée maximal d\'un slowmode est de 6heure.').then(m => m.delete({ timeout: 5000 }));

        if (currentCooldown === time) return message.channel.send(`Le SlowMode est mis sur ${args[0]}`);

        embed.setTitle('Slowmode Enabled')
            .addField('Slowmode: ', args[0])
            .addField('Raison: ', reason)
            .setColor('#ff0000');

        message.channel.setRateLimitPerUser(time, reason).then(m => m.send(embed));

    },
    name: 'slowmode',
    guildOnly: true

}