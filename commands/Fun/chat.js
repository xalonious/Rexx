const { chatBot } = require('reconlx')
const Discord = require('discord.js')
module.exports = {
    name: 'chat',
    description: 'Feeling bored? Feel free to talk to me!',
    usage: '<whatever you want to say>',

    run : async(client, message, args) => {
        const notext = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not specify anything to say.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png') 
        const yeah = args.join(' ')
        if(!yeah) return message.channel.send(notext)
        chatBot(message, yeah)
    }
}