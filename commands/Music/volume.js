const Discord = require('discord.js')
module.exports = {
  name: 'volume',
  aliases : ['vol'],
  description: 'sets the volume for the music',
  usage: '<volume>',
  
  run : async(client, message, args) => {
    if(!message.member.voice.channel) return message.channel.send('You must be in the vc to set the volume!')
    
    
    const nq = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not specify the volume.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png') 
    
    const query = args.join(' ')
    if(!query) return message.channel.send(nq)
    client.player.setVolume(message, query)
    message.channel.send(`Volume has been set to ${query}!`)
    
    
    
    }
  }