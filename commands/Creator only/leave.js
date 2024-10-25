const Discord = require('discord.js')
module.exports = {
  name: 'leave',
  description: 'makes the bot leave a server',
  usage: '<serverid>',
  run : async(client, message, args) => {
    const nopermsembed = new Discord.MessageEmbed()
        .setTitle('Error: Missing Permissions')
        .setDescription('Only the bot creator can use this command.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')
  if(message.author.id !== "531479392128598027") return message.channel.send(nopermsembed)
  const id = args.join(' ')

  const noid = new Discord.MessageEmbed()
  .setTitle('Error: Missing Arguments')
  .setDescription('You did not specify the server ID.')
  .setColor('RED')
  .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')

  if(!id) return message.channel.send(noid)
  const guild = client.guilds.cache.get(id);

  const noguild = new Discord.MessageEmbed()
  .setTitle('Error: Not In Server')
  .setDescription('I am not in that server.')
  .setColor('RED')
  .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')

  if(!guild) return message.channel.send(noguild)
guild.leave();

const done = new Discord.MessageEmbed()
        .setTitle('Success')
        .setDescription(`Succesfully left ${guild}`)
        .setColor('GREEN')
        .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/whatsapp/238/white-heavy-check-mark_2705.png')

    message.channel.send(done)
  }}