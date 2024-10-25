const { MessageEmbed } = require('discord.js');
const star = require('star-labs');
module.exports = {
name: 'kiss',
description: 'kiss someone!',
usage: '<user>',
botPermissions: ['EMBED_LINKS'],
run : async(client, message, args) => {


        let aA = message.author
        let aB = message.mentions.users.first()
        if(aA === aB) return message.channel.send('you cant kiss yourself?')
        if (!aB) return message.channel.send('Please mention a user to kiss.');
        const aC = new MessageEmbed()
            .setDescription(aA.tag + ' kisses ' + aB.tag)
            .setImage(star.kiss()) 
            .setFooter(`Command requested by ${message.member.displayName}`, message.author.displayAvatarURL())
            .setTimestamp();
        message.channel.send(aC); 
}}