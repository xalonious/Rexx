const Discord = require('discord.js')
const { hangman } = require('reconlx')
module.exports = {
    name : 'hangman',
    description: 'play a game of hangman',
    usage: '<channel> <word>',
    run : async(client, message, args) => {


        const nochan = new Discord.MessageEmbed()
    .setTitle('Error: Missing Arguments')
    .setDescription('You did not specify a channel.')
    .setColor('RED')
    .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')

        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
        if(!channel) return message.channel.send(nochan)
        const word = args.slice(1).join(" ")


        const noword = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not specify a word.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')

        if(!word) return  message.channel.send(noword)

        const hang = new hangman({
            message: message,
            word: word,
            client: client,
            channelID: channel.id,
        })

        hang.start();
    }
}