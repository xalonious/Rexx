const prefixSchema = require('../../models/prefix')
const { Message } = require('discord.js')
const Discord = require('discord.js')
module.exports = {
    name : 'setprefix',
    aliases : ['prefix'],
    description: 'Sets the prefix for the server',
    usage: '<prefix>',
    userPermissions: ['MANAGE_GUILD'],
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
       
        const res = await args.join(" ")

        const noprefix = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not specify a prefix to change to.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')

        if(!res) return message.channel.send(noprefix)
        prefixSchema.findOne({ Guild : message.guild.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
                prefixSchema.findOneAndDelete({ Guild : message.guild.id })
                data = new prefixSchema({
                    Guild : message.guild.id,
                    Prefix : res
                })
                data.save()

                const succes = new Discord.MessageEmbed()
        .setTitle('Success')
        .setDescription(`I succesfully changed the prefix for this server to ${res}`)
        .setColor('GREEN')
        .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/whatsapp/238/white-heavy-check-mark_2705.png')

                message.channel.send(succes)
            } else {
                data = new prefixSchema({
                    Guild : message.guild.id,
                    Prefix : res
                })
                data.save()
                const succes2 = new Discord.MessageEmbed()
        .setTitle('Success')
        .setDescription(`I succesfully changed the prefix for this server to ${res}`)
        .setColor('GREEN')
        .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/whatsapp/238/white-heavy-check-mark_2705.png')
       
                message.channel.send(succes2)
            }
        })
    }
}