const Discord = require('discord.js'); 
const superagent = require('superagent'); 

module.exports = {
    name: 'slap',
    description: 'slaps someone',
    usage: '<user>',
    botPermissions: ['EMBED_LINKS'],
    run : async(client, message, args) =>{
    if (!message.mentions.users.first()) return message.reply("You need to mention someone to slap them"); 
      if(message.mentions.users.first().id === message.author.id) return message.channel.send('What are you even thinking man? You cant slap yourself lol')
    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/slap"); //wut we need 
    
    const embed = new Discord.MessageEmbed()
    .setColor("#ff9900") 
    .setTitle(`bro , ${message.mentions.users.first().username} you have been slapped by ${message.author.username}`) 
    .setImage(body.url) 
    .setFooter(`Command requested by ${message.member.displayName}`, message.author.displayAvatarURL()); 
    message.channel.send({embed})
}}

