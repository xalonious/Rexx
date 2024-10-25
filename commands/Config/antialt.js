const Schema = require('../../models/antialt')
const Discord = require('discord.js')
module.exports = {
    name: 'antialt',
    description: 'manage the anti alt system',
    usage: '<enable/disable>',
    userPermissions: ['MANAGE_GUILD'],
    botPermissions: ['KICK_MEMBERS'],

    run : async(client, message, args) => {


        const novalid = new Discord.MessageEmbed()
        .setTitle('Error: Invalid Arguments')
        .setDescription('The option you have stated is invalid, use either enable or disable.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')

        const already = new Discord.MessageEmbed()
        .setTitle('Error: Already Enabled')
        .setDescription('The anti alt system is already enabled!')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')


        const successs = new Discord.MessageEmbed()
        .setTitle('Success')
        .setDescription('The anti alt system has been succesfully enabled!')
        .setColor('GREEN')
        .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/whatsapp/238/white-heavy-check-mark_2705.png')

        const successsss = new Discord.MessageEmbed()
        .setTitle('Success')
        .setDescription('The anti alt system has been succesfully disabled!')
        .setColor('GREEN')
        .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/whatsapp/238/white-heavy-check-mark_2705.png')


        const nolol = new Discord.MessageEmbed()
        .setTitle('Error: Not Enabled')
        .setDescription('The anti alt system is not enabled!')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')



        const query  = args[0]
        if(!['enable', 'disable'].includes(query)) return message.channel.send(novalid)

        if(query === 'enable') {
            await Schema.findOne({ Guild: message.guild.id}, async(err, data) => {
                if(err) throw err;
                if(data) return message.channel.send(already)
                data = new Schema({
                    Guild: message.guild.id,
                }).save()
            })
            message.channel.send(successs)
        } else if(query === 'disable') {
            await Schema.findOne({ Guild: message.guild.id}, async(err, data) => {
                if(!data) return message.channel.send(nolol)
                data.delete()
            })
            message.channel.send(successsss)
        }
    }
}