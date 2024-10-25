const Discord = require('discord.js');

module.exports = {
    name: 'createchannel',
    aliases : ['createchan'],
    timeout : 10000,
    description: 'Creates a channel',
    usage: '<channel name>',
    userPermissions: ['MANAGE_CHANNELS'],
    botPermissions: ['MANAGE_CHANNELS'],

    run : async(client, message, args) => {




        const channelNameQuery = args.join(" ");



        const successssss = new Discord.MessageEmbed()
        .setTitle('Success')
        .setDescription(`${channelNameQuery} was succesfully created.`)
        .setColor('GREEN')
        .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/whatsapp/238/white-heavy-check-mark_2705.png')



        const noargs = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not specify a channel name.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')
        if(!channelNameQuery) return message.channel.send(noargs)

        message.guild.channels.create(channelNameQuery)
        .then(ch => {
            message.channel.send(successssss)
        })

    }
}