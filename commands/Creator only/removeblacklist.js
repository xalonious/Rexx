const blacklist = require('../../models/blacklist')
const { Message } = require('discord.js')
const Discord = require('discord.js')

module.exports = {
    name : 'removeblacklist',
    aliases : ['unblacklist'],
    description: 'removes blacklist for a user',
    usage: '<user>',
    run : async(client, message, args) => {
        const nopermsembed = new Discord.MessageEmbed()
        .setTitle('Error: Missing Permissions')
        .setDescription('Only the bot creator can use this command.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')
        if(message.author.id !== '531479392128598027') return message.channel.send(nopermsembed)
        const User = message.guild.members.cache.get(args[0])
        const nomention = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('The userid is not valid.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')

        if(!User) return message.channel.send(nomention)

        blacklist.findOne({ id : User.user.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
               await blacklist.findOneAndDelete({ id : User.user.id })
                .catch(err => console.log(err))
                const savedff = new Discord.MessageEmbed()
                .setTitle('Success')
                .setDescription(`**${User.displayName}** has been removed from the blacklist.`)
                .setColor('GREEN')
                .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/whatsapp/238/white-heavy-check-mark_2705.png')

                message.channel.send(savedff)
            } else {

                const alreadyb = new Discord.MessageEmbed()
        .setTitle('Error: Not Blacklisted')
        .setDescription('This user is not blacklisted.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')

               message.channel.send(alreadyb)
            }
           
        })
    }
}