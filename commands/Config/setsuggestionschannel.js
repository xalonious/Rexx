const Schema = require('../../models/suggestions')

const Discord = require('discord.js')

module.exports = {
    name: 'setsuggestionschannel',
    description: 'sets the suggestions channel',
    usage: '<channel>',
    userPermissions: ['MANAGE_GUILD'],

    run : async(client, message, args) => {
        

        const noarr = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not specify a channel.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')


        const successssss = new Discord.MessageEmbed()
        .setTitle('Success')
        .setDescription(`Succesfully set the suggestions channel!`)
        .setColor('GREEN')
        .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/whatsapp/238/white-heavy-check-mark_2705.png')


      
        const channel = message.mentions.channels.first()
        if(!channel) return message.channel.send(noarr)

        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(data) {
                data.Channel = channel.id;
                data.save()
            } else {
                new Schema({
                    Guild: message.guild.id,
                    Channel: channel.id
                }).save();
            }
        })

        message.channel.send(successssss)
    }
}