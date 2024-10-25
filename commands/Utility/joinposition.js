const Discord = require('discord.js');

module.exports = {
    name: 'joinposition',
    aliases : ['joinpos'],
    description: 'gives the join position of a member',
    usage: '<user>',

    run : async(client, message, args) => {
        const member = message.mentions.members.first()


        const nomem = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not specify a member.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')

        if(!member) return message.channel.send(nomem)

        const members = message.guild.members.cache.sort((a, b) => a.joinedTimeStamp - b.joinedTimeStamp).array();

        const position = new Promise((ful) => {
            for(let i = 1; i < members.length + 1; i++) {
                if(members[i - 1].id === member.id) ful(i);
            }
        })

        message.channel.send(`${member} is member #${await position} to join this server!`)
    }
}