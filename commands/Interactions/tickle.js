const Discord = require('discord.js');
const superagent = require('superagent'); 

module.exports = {
    name: 'tickle',
    description: 'tickle someone!',
    usage: '<user>',
    botPermissions: ['EMBED_LINKS'],
    run : async(client, message, args) =>{
    if (!message.mentions.users.first()) return message.reply("You need to mention someone to tickle them");
   
    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/tickle"); 
    
    const embed = new Discord.MessageEmbed() 
    .setColor("#ff0000") 
    .setTitle(`hehe, ${message.author.username} tickles ${message.mentions.users.first().username}`) // lets make it so fun
    .setImage(body.url) 
    .setFooter(`Command requested by ${message.member.displayName}`, message.author.displayAvatarURL()); 
    message.channel.send({embed})
    }}