const db = require('../../models/warns')
const { Message, MessageEmbed } = require('discord.js')
const Discord = require('discord.js')

module.exports = {
    name :'warns',
    aliases : ['warnings'],
    description: 'view warnings for a user',
    usage: '<user>',
    userPermissions: ['MANAGE_MESSAGES'],
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
     
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        const nomention = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not mention a user.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')

        if(!user) return message.channel.send(nomention)
        const reason = args.slice(1).join(" ")
        db.findOne({ guildid: message.guild.id, user: user.user.id}, async(err, data) => {
            if(err) throw err;
            if(data) {
                message.channel.send(new MessageEmbed()
                    .setTitle(`${user.user.tag}'s warns`)
                    .setDescription(
                        data.content.map(
                            (w, i) => 
                            `\`${i + 1}\` | Moderator : ${message.guild.members.cache.get(w.moderator).user.tag}\nReason : ${w.reason}`
                        )
                    )
                    .setColor("BLUE")
                )
            } else {

                const nodata = new Discord.MessageEmbed()
        .setTitle('Error: No Warns')
        .setDescription('This user has no warnings.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')
                message.channel.send(nodata)
            }

        })
    }
}