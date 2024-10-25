const Discord = require('discord.js')

module.exports = {
    name: 'deletechannel',
    aliases : ['delchannel', 'delchan'],
    timeout : 10000,
    description: 'deletes a channel',
    usage: '<channel>',
    userPermissions: ['MANAGE_CHANNELS'],
    botPermissions: ['MANAGE_CHANNELS'],

    run : async(client, message, args) => {


        const args0 = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not mention a channel.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')




        if(!args[0]) return message.channel.send(args0)



        const noargs = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not specify a channel to delete.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')

        const channelTarget = message.mentions.channels.first() || message.channel;
        if(!channelTarget) return message.channel.send(noargs)




const ok = new Discord.MessageEmbed()
        .setTitle('Success')
        .setDescription('Channel has been deleted succesfully.')
        .setColor('GREEN')
        .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/whatsapp/238/white-heavy-check-mark_2705.png')




        channelTarget.delete()
        .then(ch => {
            message.channel.send(ok)
        })
    }
}