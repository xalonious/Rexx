const Discord = require("discord.js");
module.exports = {
    name: 'howgay',
    aliases : ['gayrate'],
    description: 'tells how gay someone is',
    usage: '[user]',
    run: async(client, message, args) => {
        const user = client.users.cache.find(user => {
            return user.id === args[0]
          }) || message.mentions.members.first() ? message.mentions.members.first().user : '' || message.member.user 
    const gayrate = Math.floor(Math.random() * 100)
    const embed = new Discord.MessageEmbed()
    .setTitle('Gay r8 machine')
    .setDescription( `${user} is ` + gayrate + '%' +  " gay :rainbow_flag:")
    .setColor('RANDOM')
    message.channel.send(embed)
       
}}