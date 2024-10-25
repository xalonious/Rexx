const blacklist = require('../../models/blacklist')
const Discord = require('discord.js')

module.exports = {
    name : 'blacklist',
    description: 'blacklist a user from using the bot',
    usage: '<userid>',
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        const nopermsembed = new Discord.MessageEmbed()
        .setTitle('Error: Missing Permissions')
        .setDescription('Only the bot creator can use this command.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')
        if(message.author.id !== '531479392128598027') return message.channel.send(nopermsembed)
        const target = args[0]

        const nomention = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('The userid is not valid.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')

        if(!target) return message.channel.send(nomention)
        blacklist.findOne({ id : target }, async(err, data) => {
            if(err) throw err;
            if(data) {
                const dataadd = new Discord.MessageEmbed()
        .setTitle('Error: Already Blacklisted')
        .setDescription(`**${target.displayName}** has already been blacklisted!`)
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')
                message.channel.send(dataadd)
            } else {
                data = new blacklist({ id : target })
                data.save()
                .catch(err => console.log(err))
                const savedff = new Discord.MessageEmbed()
                .setTitle('Success')
                .setDescription(`**${target}** has been added to the blacklist.`)
                .setColor('GREEN')
                .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/whatsapp/238/white-heavy-check-mark_2705.png')
            message.channel.send(savedff)
            }
           
        })
    }
}