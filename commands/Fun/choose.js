const Discord = require('discord.js')

module.exports = {
  name: 'choose',
  aliases : ['pick'],
  descriptipn: 'makes the bot pick something',
  usage: '<options>',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async(client , message , args) => {

  
    const split = args.join(" ").split("/")
 if (!split[1]) return message.reply("Provide more than 1 argument separated with /")

if (split[8]) return message.reply('You can only have a max of \`8\` choices!') 


let choices = split[Math.floor(Math.random() * split.length)]

message.channel.send(`I choose - \`${choices}\``)
  }
}