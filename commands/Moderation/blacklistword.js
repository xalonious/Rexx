const Discord = require('discord.js')
const { Collection } = require('discord.js')
const { blacklistedWords } = require('../../Collection')
const Schema = require('../../models/blacklists')
module.exports = {
    name: 'blacklistword',
    aliases : ['blword'],
    description: 'blacklists a word',
    usage: '<add/remove/display> <word>',
    userPermissions: ['MANAGE_GUILD'],
    botPermissions: ['MANAGE_MESSAGES'],

    run : async(client, message , args) => {

        const noword = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not specify a word to blacklist.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png') 


        const nowordd = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not specify a word.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png') 


        const black = new Discord.MessageEmbed()
        .setTitle('Error: Already Blacklisted')
        .setDescription('That word is already blacklisted!')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png') 

        const nodataaa = new Discord.MessageEmbed()
        .setTitle('Error: No Blacklists')
        .setDescription('This server does not have any blacklisted words!')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png') 


        const notblack = new Discord.MessageEmbed()
        .setTitle('Error: Not Blacklisted')
        .setDescription('That word is not blacklisted.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')
        
        
        



        const succes = new Discord.MessageEmbed()
        .setTitle('Success')
        .setDescription('Word has been blacklisted!')
        .setColor('GREEN')
        .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/whatsapp/238/white-heavy-check-mark_2705.png')


        const successss = new Discord.MessageEmbed()
        .setTitle('Success')
        .setDescription('Word has been unblacklisted!')
        .setColor('GREEN')
        .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/whatsapp/238/white-heavy-check-mark_2705.png') 


        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(nopermsembed)

        const query = args[0]?.toLowerCase();
        const guild = { Guild: message.guild.id };
        if(query === 'add') {
            const word = args[1]?.toLowerCase();
            if(!word) return message.channel.send(noword)

            Schema.findOne(guild, async(err, data) => {
                if(data) {
                    if(data.Words.includes(word)) return message.channel.send(black)
                    data.Words.push(word)
                    data.save()
                    blacklistedWords.get(message.guild.id).push(word)
                } else {
                    new Schema({
                        Guild: message.guild.id,
                        Words: word
                    }).save()

                    blacklistedWords.set(message.guild.id, [word])
                    message.channel.send(succes)
                }
            })
        } else if(query === 'remove') {
            const word = args[1]?.toLowerCase()
            if(!word) return message.channel.send(nowordd)

            Schema.findOne(guild, async(err, data) => {
                if(!data) return message.channel.send(nodataaa)

                if(!data.Words.includes(word)) return message.channel.send(notblack)

                const filtered = data.Words.filter((target) => target !== word);

                await Schema.findOneAndUpdate(guild, {
                    Guild: message.guild.id,
                    Words: filtered
                })

                blacklistedWords.get(message.guild.id).filter(
                    (target) => target !== word
                )
            })

            message.channel.send(successss)
        } else if(query === 'display') {
            Schema.findOne(guild, async(err, data) => {
                if(!data) return message.channel.send(nodataaa)

                message.channel.send(
                    new Discord.MessageEmbed()
                    .setTitle('Blacklisted words')
                    .setDescription(data.Words.join(', '))
                )
            })
        }
    }
}