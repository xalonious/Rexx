const Discord = require('discord.js')
module.exports = {
    name: "nuke",
    timeout : 10000,
    description: "Nukes a given channel",
    usage: '<channel> [reason]',
    userPermissions: ['MANAGE_MESSAGES'],
    botPermissions: ['MANAGE_CHANNELS'],
    run: async(client, message, args) => {
      
        
        let reason = args.join(" ") || "No Reason Specified"

        const nonuke = new Discord.MessageEmbed()
        .setTitle('Error')
        .setDescription('This channel cannot be nuked')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')
        

        if(!message.channel.deletable) return message.channel.send(nonuke)
        
        let newchannel = await message.channel.clone()
        await message.channel.delete()
        let embed = new Discord.MessageEmbed()
        .setTitle("Channel Nuked")
        .setDescription(reason)
        .setImage('https://media0.giphy.com/media/oe33xf3B50fsc/200.gif')
        await newchannel.send(embed)
    }
}