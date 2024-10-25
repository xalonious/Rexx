const giveawayClient = require('../../client');
const Discord = require('discord.js')
const ms = require('ms')
module.exports = {
    name: 'rmv-cache',


    run : async(client, message, args) => {
        const noperms = new Discord.MessageEmbed()
        .setTitle('Error: Missing Permissions')
        .setDescription('Only the bot creator can use this command.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')
        .setFooter('Required permission: Manage Messages')
        if(message.author.id != '531479392128598027') return message.channel.send(noperms)



        giveawayClient.removeCachedGiveaways(true);

      


    }}