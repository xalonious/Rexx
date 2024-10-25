const Discord = require('discord.js')
module.exports = {
  name: 'resume',
  description: 'resumes the song',
  
  run : async(client, message, args) => {
    if(!message.member.voice.channel) return message.channel.send('You must be in the vc to resume the music!')
    
    
    client.player.resume(message)
    message.channel.send('Resuming the music!')
    
    
     }}