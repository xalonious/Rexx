const Discord = require('discord.js')
module.exports = {
  name: 'pause',
  description: 'pauses the song',
  
  run : async(client, message, args) => {
    if(!message.member.voice.channel) return message.channel.send('You must be in the vc to pause the music!')
    
    
    client.player.pause(message)
    message.channel.send('Paused the music!')
    
    }}