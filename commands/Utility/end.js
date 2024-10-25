const giveawayClient = require('../../client');
const Discord = require('discord.js')
const ms = require('ms')
module.exports = {
    name: 'end',
    description: 'ends a giveaway',
    usage: '<messageid>',
    userPermissions: ['MANAGE_MESSAGES'],


    run : async(client, message, args) => {
        



        const noid = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not specify a message id.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')


      

        const messageid = args[0]
        if(!messageid) return message.channel.send(noid)
        giveawayClient.end(messageid, true)

    }}