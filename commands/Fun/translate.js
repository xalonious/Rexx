const translate = require("@iamtraction/google-translate");
const Discord = require('discord.js')
module.exports = {
  name: 'translate',
  description: 'translates something to english',
  usage: '<word/sentence>',


  run: async(client, message, args) => {


        const query = args.join(' ')

        const noword = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not specify anything to translate.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')



        if(!query) return message.channel.send(noword)

        translate(query, { to: 'en' }).then(res => { 
           message.channel.send(res.text); 
        }).catch(err => { 
            message.channel.send("An error occured, please try again later.");
            console.log(err)
       })
    }}
