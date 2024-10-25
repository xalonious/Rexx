const Discord = require('discord.js')

module.exports = {
    name: 'unban',
    description: 'unbans a user',
    usage: '<userid>',
    userPermissions: ['BAN_MEMBERS'],
    botPermissions: ['BAN_MEMBERS'],

    run : async(client, message, args) => {



          const noargs = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not specify a user to unban.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')



        const not = new Discord.MessageEmbed()
        .setTitle('Error')
        .setDescription('The ID you proivided was either not valid, or the user is not banned.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')



        if (!args[0]) return message.channel.send(noargs)


        const successs = new Discord.MessageEmbed()
        .setTitle('Success')
        .setDescription('User has been unbanned.')
        .setColor('GREEN')
        .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/whatsapp/238/white-heavy-check-mark_2705.png')



        try {
            const user = await message.guild.members.unban(args[0])
            return message.channel.send(successs)
        } catch {
            return message.channel.send(not)
        }
    }
}