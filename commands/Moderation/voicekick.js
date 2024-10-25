const Discord = require('discord.js')

module.exports = {
    name: 'voicekick',
    aliases : ['vckick'],
  description: 'disconnects a user from a voice channel.',
    usage: '<user>',
    userPermissions: ['MUTE_MEMBERS'],
    botPermissions: ['MUTE_MEMBERS'],

    run : async(client, message, args) => {


        const noargs = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not specify anyone to voice kick.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')

        
        const novc = new Discord.MessageEmbed()
        .setTitle('Error: Not in vc')
        .setDescription('The mentioned user is not in a voice channel.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')

        const target = message.mentions.members.first()
        if(!target) return message.channel.send(noargs)

        let { channel } = target.voice;
        if(!channel) return message.channel.send(novc)

        target.voice.kick()

        const successssss = new Discord.MessageEmbed()
        .setTitle('Success')
        .setDescription('User has been kicked from vc.')
        .setColor('GREEN')
        .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/whatsapp/238/white-heavy-check-mark_2705.png')

        message.channel.send(successssss)

    }
}