const { DiscordAPIError } = require("discord.js")

const Discord = require('discord.js');
module.exports = {
    name : 'clear',
    timeout : 5000,
    description: 'Clears messages',
    usage: '<amount>',
    aliases : ['purge', 'prune'],
    userPermissions: ['MANAGE_MESSAGES'],
    botPermissions: ['MANAGE_MESSAGES'],
    run : async(client, message, args) => {

        const noargs = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not specify how many messages you want me to purge.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')
        


        if(!args[0]) return message.channel.send(noargs)

        const nonumber = new Discord.MessageEmbed()
        .setTitle('Error: Invalid argument')
        .setDescription('You did not specify a valid number.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')
       
        if(isNaN(args[0])) return message.channel.send(nonumber)

        const override = new Discord.MessageEmbed()
        .setTitle('Error: Limit')
        .setDescription('The max amount of messages that I can clear at a time is 99')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')
        .setFooter(`Requested by ${message.member.displayName}`, message.author.displayAvatarURL()); 

        if(parseInt(args[0]) > 99) return message.channel.send(override)
        await message.channel.bulkDelete(parseInt(args[0]) + 1)
            .catch(err => console.log(err))

            const successs = new Discord.MessageEmbed()
            .setTitle('Success')
            .setDescription(`I succesfully cleared ${args[0]} messages.`)
            .setColor('GREEN')
            .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/whatsapp/238/white-heavy-check-mark_2705.png')
            
        message.channel.send(successs)
    }
}