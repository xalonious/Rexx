const Discord = require('discord.js')
const { Util } = require('discord.js')
const Schema = require('../../models/reaction-roles')

module.exports = {
    name: 'addreactionrole',
    aliases : ['reactionroleadd'],
    description: 'Makes a new reaction role',
    usage: '<role> <emoji>',
    userPermissions: ['MANAGE_ROLES'],

    run : async(client, message, args) => {
        


        const noem = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not mention an emoji!')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png') 

        const role = message.mentions.roles.first();


        const done = new Discord.MessageEmbed()
        .setTitle('Success')
        .setDescription(`Succesfully saved reaction role! Run the reactionpanel command to send the reacion panel!`)
        .setColor('GREEN')
        .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/whatsapp/238/white-heavy-check-mark_2705.png')



        let [, emoji] = args;
        if(!emoji) return message.channel.send(noem)

        const parsedEmoji = Util.parseEmoji(emoji);

        Schema.findOne({ Guild: message.guild.id}, async(err, data) => {
            if(data) {
                data.Roles[parsedEmoji.name] = [
                    role.id,
                    {
                        id: parsedEmoji.id,
                        raw: emoji
                    }
                ]

                await Schema.findOneAndUpdate({ Guild: message.guild.id }, data);
            } else {
                new Schema({
                    Guild: message.guild.id,
                    Message: 0,
                    Roles: {
                        [parsedEmoji.name]: [
                            role.id,
                            {
                                id: parsedEmoji.id,
                                raw: emoji
                            }
                        ]
                    }
                }).save()
            }
            message.channel.send(done)
        })



    }
}