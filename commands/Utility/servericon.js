const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'servericon',
    aliases : ['guildicon'],
    description: 'Gives you the icon of the server',
    botPermissions: ['EMBED_LINKS'],
    run: async(client, message, args) => {
        const Embed = new MessageEmbed()
        .setTitle(`${message.guild.name}`)
        .setImage(message.guild.iconURL({ dynamic: true, size:2048}))
        message.channel.send(Embed)

    }
}