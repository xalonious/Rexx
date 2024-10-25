const Discord = require('discord.js')

module.exports = {
    name: 'membercount',
    aliases : ['mcount', 'members'],
    description: 'gives the current membercount',
    botPermissions: ['EMBED_LINKS'],

    run : async(client, message, args) => {
        let membed = new Discord.MessageEmbed()
        .setTitle('Membercount')
        .setDescription(`${message.guild.memberCount}`)
        .setColor('BLUE')
        .setThumbnail(message.guild.iconURL())
        message.channel.send(membed)
    }

}