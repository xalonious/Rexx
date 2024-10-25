const giveawayClient = require('../../client');
const Discord = require('discord.js')
const ms = require('ms')
module.exports = {
    name: 'giveaway',
    description: 'starts a giveaway',
    usage: '<channel> <time> <amount of winners> <prize>',
    userPermissions: ['MANAGE_MESSAGES'],
    botPermissions: ['EMBED_LINKS'],


    run : async(client, message, args) => {
       


        const nochan = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not specify a channel.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')


        const notime = new Discord.MessageEmbed()
        .setTitle('Error: Arguments')
        .setDescription('You did not specify a time.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')



        const channel = message.mentions.channels.first()
        if(!channel) return message.channel.send(nochan)

        let time = args[1];
        if(!time) return message.channel.send(notime)
        time = ms(time);

        giveawayClient.start({
            channel,
            time,
            hostedBy: message.author,
            description: "Epic giveaway! Note that the time is in GMT!",
            winners: parseInt(args[2]),
            prize: args.slice(3).join(" "),
            

        });
        


    }
}