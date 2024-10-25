const Discord = require('discord.js')
const ms = require('ms');

module.exports = {
    name: 'slowmode',
    timeout : 10000,
  aliases : ['cooldown'],
    description: 'sets the slowmode of a channel',
    usage: '<time> [reason]',
    userPermissions: ['MANAGE_MESSAGES'],
    botPermissions: ['MANAGE_CHANNELS'],
    run : async(client, message, args) => {


        const notime = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not specify a time.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')

        if (!args[0]) return message.channel.send(notime)

        const currentCooldown = message.channel.rateLimitPerUser;

        const reason = args[1] ? args.slice(1).join(' ') : 'No reason specified';

        const embed = new Discord.MessageEmbed()
            .setFooter(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }));

        if (args[0] === 'off') {

            const offf = new Discord.MessageEmbed()
        .setTitle('Error')
        .setDescription('Slowmode is off already.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')
        
            if (currentCooldown === 0) return message.channel.send(offf)

            embed.setTitle('Slowmode Disabled')
                .setColor('#00ff00')
            return message.channel.setRateLimitPerUser(0, reason)

        }

        const time = ms(args[0]) / 1000;

        const notvalid = new Discord.MessageEmbed()
        .setTitle('Error: Invalid Args')
        .setDescription('You did not specify a valid time')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')

        if (isNaN(time)) return message.channel.send(notvalid)


        const toohigh = new Discord.MessageEmbed()
        .setTitle('Error: Limit')
        .setDescription('That slowmode limit is too high, please enter anything lower than 6 hours.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')

        if (time >= 21600) return message.channel.send(toohigh)


        const sametime = new Discord.MessageEmbed()
        .setTitle('Error')
        .setDescription(`Slowmode is already set to ${args[0]}`)
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')

        if (currentCooldown === time) return message.channel.send(sametime);

        embed.setTitle('Slowmode Enabled')
            .addField('Slowmode: ', args[0])
            .addField('Reason: ', reason)
            .setColor('#ff0000');

        message.channel.setRateLimitPerUser(time, reason).then(m => m.send(embed));

    }
}