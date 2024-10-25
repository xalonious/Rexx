const db = require('../../models/warns')
const Discord = require('discord.js')
module.exports = {
    name : 'clearwarns',
    aliases : ['delwarns'],
    description: 'clears warns for a user',
    usage: '<user>',
    userPermissions: ['MANAGE_MESSAGES'],
    run : async(client, message, args) => {
   
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        const nouser = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not mention a user')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')

        if(!user) return message.channel.send(nouser)
        db.findOne({ guildid : message.guild.id, user: user.user.id}, async(err,data) => {
            if(err) throw err;
            if(data) {
                await db.findOneAndDelete({ user : user.user.id, guildid: message.guild.id})

                const cleared = new Discord.MessageEmbed()
        .setTitle('Success')
        .setDescription(`Succesfully cleared the warnings of ${user.user.tag}`)
        .setColor('GREEN')
        .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/whatsapp/238/white-heavy-check-mark_2705.png')
                message.channel.send(cleared)
            } else {

                const nowarns = new Discord.MessageEmbed()
                .setTitle('Error: No warns')
                .setDescription('This user has no warnings.')
                .setColor('RED')
                .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')
                message.channel.send(nowarns)
            }
        })
    }
}