const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'topservers',
    aliases : ['topguilds'],
    description: 'Displays the top 10 servers with the most members the bot is in',

    run : async(client, message, args) => {
      if(message.author.id != '531479392128598027') return message.channel.send('Only the bot creator can use this command!')
        const guilds = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).first(10);

        const description = guilds.map((guild, index) => {
            return `${index+1}) ${guild.name} -> ${guild.memberCount} members`
        }).join('\n')

        message.channel.send(
            new MessageEmbed()
            .setTitle('Top Servers')
            .setDescription(description)
        )
    }
}