const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "wikipedia",
  description: 'searches something on wikipedia',
  run: async (client, message, args) => {
    const noargs = new Discord.MessageEmbed()
    .setTitle('Error: Missing Arguments')
    .setDescription('You did not specify anything to search for.')
    .setColor('RED')
    .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')

    const noargss = new Discord.MessageEmbed()
    .setTitle('Error: Invalid Arguments')
    .setDescription('I could not find that page.')
    .setColor('RED')
    .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')




      const query = args.join(" ")
      if(!query) return message.channel.send(noargs)
  const body = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        query
      )}`
    ).then(res => res.json().catch(() => {}));
    if (!body) return message.channel.send(noargss)
    if (body.title && body.title === "Not found.")
      return message.channel.send(noargss)

    const embed = new Discord.MessageEmbed()
      .setTitle(`🌐 ${body.title}`)
      .addField(
        "More Info:",
        `**[Click Here](${body.content_urls.desktop.page})**`,
        true
      )
      .setDescription(`** ${body.extract} **`)
      .setColor("GREEN");
    if (body.thumbnail) embed.setThumbnail(body.thumbnail.source);
    message.channel.send(embed);
  }
}; 