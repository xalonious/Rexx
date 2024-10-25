const { Client, Message, MessageEmbed } = require("discord.js");
const Discord = require('discord.js')
const axios = require("axios");
module.exports = {
  name: "docs",
  description: 'searches something in the discord.js docs',
  usage: '<query>',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const query = args.join(" ");
    const noquery = new Discord.MessageEmbed()
    .setTitle('Error: Missing Arguments')
    .setDescription('You did not specify the query')
    .setColor('RED')
    .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')

    if (!query) return message.reply(noquery)
    const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
      query
    )}`;

    axios.get(url).then(({ data }) => {
      if (data) {
        message.channel.send({ embed: data });
      }
    });
  },
};