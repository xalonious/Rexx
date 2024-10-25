const Discord = require("discord.js");
module.exports = {
    name: 'howdank',
    aliases : ['dankrate'],
    description: 'tells you how dank you are',
    usage: '[user]',
    run: async(client, message, args) => {
        const user = client.users.cache.find(user => {
            return user.id === args[0]
          }) || message.mentions.members.first() ? message.mentions.members.first().user : '' || message.member.user 
    const dankrate = Math.floor(Math.random() * 100)
    const embed = new Discord.MessageEmbed()
    .setTitle('Dank r8 machine')
    .setDescription( `${user} is ` + dankrate + '%' +  " dank :sunglasses:")
    .setColor('RANDOM')
    message.channel.send(embed)
       
}}