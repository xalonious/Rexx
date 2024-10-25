const db = require('../../models/warns')
const Discord = require('discord.js')

module.exports = {
    name :'warn',
    description: 'warn a user',
    usage: '<user> <reason>',
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
        if(!reason) return message.channel.send('Please provide a reason')
        db.findOne({ guildid: message.guild.id, user: user.user.id}, async(err, data) => {
            if(err) throw err;
            if(!data) {
                data = new db({
                    guildid: message.guild.id,
                    user : user.user.id,
                    content : [
                        {
                            moderator : message.author.id,
                            reason : reason
                        }
                    ]
                })
            } else {
                const obj = {
                    moderator: message.author.id,
                    reason : reason
                }
                data.content.push(obj)
            }
            data.save()
        });
        user.send(new Discord.MessageEmbed()
            .setTitle('Warning')
            .setDescription(`You have been warned in ${message.guild.name} for: ${reason}`)
            .addField('Warned by:', `${message.author}`)
            .setFooter('Please make sure to abide by the rules to prevent being kicked/banned.')
            .setColor("RED")
        )
        message.channel.send(new Discord.MessageEmbed()
            .setDescription(`Warned ${user} for ${reason}`).setColor('BLUE')
             
        )
      client.modlogs({
        Member: user,
        Reason: reason,
        Color: 'RED',
        Moderator: message.author,
        Action: 'warn'
      }, message)
    }
}