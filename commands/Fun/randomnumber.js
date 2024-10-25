const Discord = require('discord.js')
module.exports = {
  name: 'randomnumber',
  description: "generates a random number between the given values.",
  usage: '<minimum value> <maximum value>',
  run : async(client, message, args) => {

    if (!args.length || !args[1]) {

      const novalue = new Discord.MessageEmbed()
      .setTitle('Error: Missing Arguments')
      .setDescription('You did not specify the minimum and maximum value')
      .setColor('RED')
      .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')
      message.channel.send(novalue)
    }

    else {

      let min = args[0]
      let max = args[1]

    let randNo = Math.round(Math.random() * max + min)
    
    message.channel.send(randNo)

    }

  }
}