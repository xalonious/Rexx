const { version: djsversion } = require('discord.js')
const { MessageEmbed } = require('discord.js')
const { utc } = require("moment");
const os = require("os");
const ms = require("ms");
module.exports = {
name: "botinfo",
description: "Check the info of the bot",
run: async (client, message, args) => {
  const core = os.cpus()[0];
  let totalSeconds = (client.uptime / 1000);
  let days = Math.floor(totalSeconds / 86400);
  totalSeconds %= 86400;
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = Math.floor(totalSeconds % 60);
  let uptime = `**${days}** days, **${hours}** hours, **${minutes}** minutes, **${seconds}** seconds`
  const embed = new MessageEmbed()
    .setURL(client.web)
    .setThumbnail(client.user.displayAvatarURL())
    .setColor(message.guild.me.displayHexColor || client.color)
    .addField("General", [
      `**❯ Developer:** xalonious#9999`,
      `**❯ Client:** ${client.user.tag} (${client.user.id})`,
      `**❯ Commands:** ${client.commands.size}`,
      `**❯ Servers:** ${client.guilds.cache.size.toLocaleString()} `,
      `**❯ Channels:** ${client.channels.cache.size.toLocaleString()}`,
      `**❯ Creation Date:** ${utc(client.user.createdTimestamp).format(
        "Do MMMM YYYY HH:mm:ss"
      )}`,
      `**❯ Node.js:** ${process.version}`,
      `**❯ Bot Version:** v10.5.2`,
      `**❯ Discord.js:** v${djsversion}`,
      "\u200b",
    ])
    .setColor(client.color)
    .addField("System", [
      `**❯ Platform:** ${process.platform}`,
      `**❯ Uptime:** ${uptime}`,
      `**❯ CPU:**`,
      `\u3000 Threads: ${os.cpus().length}`,
      `\u3000 Model: ${core.model}`,
      `\u3000 Speed: ${core.speed}MHz`,
    ])
    .setTimestamp();
  message.channel.send(embed);
},
};