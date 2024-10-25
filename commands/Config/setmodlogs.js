const Discord = require('discord.js')
const Schema = require('../../models/modlogs')
module.exports = {
    name: 'setmodlogs',
    description: 'sets the channel for mod logs (kick, ban, warn)',
    usage: '<channel>',
    userPermissions: ['MANAGE_GUILD'],

    run : async(client, message, args) => {
       
       


        const nochannel = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not specify the channel.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png') 


       



        const channel = message.mentions.channels.first()
        if(!channel) return message.channel.send(nochannel)

    
        const succes = new Discord.MessageEmbed()
        .setTitle('Success')
        .setDescription(`${channel} has been saved as the mod logs channel.`)
        .setColor('GREEN')
        .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/whatsapp/238/white-heavy-check-mark_2705.png')


        Schema.findOne({ Guild: message.guild.id}, async(err, data) => {
            if(data) data.delete();
            new Schema({
                Guild: message.guild.id,
                Channel: channel.id,
            }).save();
            message.channel.send(succes)
        })
    }
}