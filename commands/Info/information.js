const Discord = require('discord.js')

module.exports = {
    name: 'information',
    aliases : ['info'],
    description: 'gives you some usefull info',


    run : async(client, message, args) => {
        let infoembed = new Discord.MessageEmbed()
        .setTitle('Info')
        .setDescription('Here are usefull links you can use')
        .addField('Invite the bot:', 'https://discord.com/api/oauth2/authorize?client_id=786260081540333619&permissions=2100554870&scope=bot')
        .addField('Visit our website', 'https://service-4523.something.gg/')
        .addField('Join our support server', 'https://discord.gg/vY4WMAPDjJ')
        .addField('Vote for me on top.gg!', 'https://top.gg/bot/786260081540333619')
        .setColor('RANDOM')
        .setThumbnail(client.user.displayAvatarURL())
        message.channel.send(infoembed)
    }
}