const Discord = require('discord.js');
module.exports = {
    name: 'poll',
    description: 'launch a poll!',
    usage: '<channel> <poll>',
    userPermissions: ['MANAGE_MESSAGES'],
    botPermissions: ['EMBED_LINKS'],
    run : async(client, message, args) => {
      
      
        


        const noc = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not specify a channel.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')

        const nop = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not specify a a poll.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')





let pollChannel = message.mentions.channels.first();
if(!pollChannel) return message.channel.send(noc)
        let pollDescription = args.slice(1).join(' ');
        if(!pollDescription) return message.channel.send(nop)
        
        let embedPoll = new Discord.MessageEmbed()
        .setTitle('😲 New Poll! 😲')
        .setDescription(pollDescription)
        .setColor('YELLOW')
        let msgEmbed = await pollChannel.send(embedPoll);
        await msgEmbed.react('👍')
        await msgEmbed.react('👎')
    }

}