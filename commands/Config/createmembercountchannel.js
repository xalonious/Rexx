const Discord = require('discord.js')
const Schema = require('../../models/member-count')

module.exports = {
    name: 'createmembercountchannel',
    aliases : ['createmembercountchan'],
    description: 'creates a voice channel that keeps track of the member count',
    userPermissions: ['MANAGE_CHANNELS'],
    botPermissions: ['MANAGE_CHANNELS'],

    run : async(client, message, args) => {
        

        const successs = new Discord.MessageEmbed()
        .setTitle('Success')
        .setDescription(`Succesfully made channel.`)
        .setColor('GREEN')
        .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/whatsapp/238/white-heavy-check-mark_2705.png')

        Schema.findOne({ Guild: message.guild.id}, async(err, data) => {
            if(data) data.delete();

            const channel = await message.guild.channels.create(`Total Members: ${message.guild.memberCount}`,
            {
                type: 'voice',
                permissionOverWrites : [
                    {
                        id: message.guild.id,
                        deny: ["CONNECT"],
                    }
                ]
            })

            new Schema({
                Guild: message.guild.id,
                Channel: channel.id,
                Member: message.guild.memberCount,
            }).save()
            message.channel.send(successs)
        })
    }
}