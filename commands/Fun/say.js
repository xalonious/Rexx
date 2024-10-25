const Discord = require('discord.js')
module.exports=  {
    name: 'say',
    timeout : 10000,
    description: 'Makes the bot say something',
    usage: '<message>',
    run : async(client, message, args) => {
        var text = args.join(" ");
       if(text.includes('@everyone')) return message.channel.send('nice try lol')
       if(text.includes('@here')) return message.channel.send('nice try lol')

        const noargs = new Discord.MessageEmbed()
      .setTitle('Error: Missing Arguments')
      .setDescription('You did not specify what you want me to say.')
      .setColor('RED')
      .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')

        if(!text) return message.channel.send(noargs)
         message.channel.send(text);
        message.delete();
        message.channel.stopTyping()
       }
      }