const Discord = require('discord.js');
const superagent = require('superagent'); 

module.exports = {
    name: 'pat',
    description: 'pat someone!',
    usage: '<user>',
    botPermissions: ['EMBED_LINKS'],
    run : async(client, message, args) =>{

    
    if (!message.mentions.users.first()) return message.reply("you must mention someone to pat them"); //if no one is mentions , lets reply as
    if (message.mentions.users.first().id === "482128001828651008") return message.channel.send('<a:yayyy:497742636439044096>'); //lets make a some a some funny reply |you can set a random emoji|
    const { body } = await superagent
    .get("https://nekos.life/api/pat"); //lets see wut we went
    
    const embed = new Discord.MessageEmbed() //onec Discordjs is updated to 12.2.0 , richembed is removed ! they replaced now as MessageEmbed
    .setColor("#3bb9ff") //you can set it as you went
    .setTitle(`${message.author.username} pats ${message.mentions.users.first().username}...`) 
    .setImage(body.url) // lets showing pat (GIF}
    .setFooter(`Command requested by ${message.member.displayName}`, message.author.displayAvatarURL()); 
    message.channel.send({embed})
}  }