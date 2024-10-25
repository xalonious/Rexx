const { Client, Message, MessageEmbed, UserFlags } = require("discord.js");

module.exports = {
  name: 'badges',
  description: 'tells you a users badges',
  usage: '[user]',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
        const user = message.mentions.users.first() || message.author;

        const flags = user.flags.toArray();

        message.channel.send(`${user}'s badges: ${flags.join(', ')} `)
  }
}