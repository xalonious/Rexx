const Discord = require('discord.js')
module.exports = {
    name: 'perms',
    aliases : ['permissions'],
    description: 'Shows all permissions a user has',
    usage: '<user>',
    botPermissions: ['EMBED_LINKS'],

    run : async(client, message, args) => {

        const noperms = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not specify a user.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')

        let user = message.mentions.members.first()
        if(!user) return message.channel.send(noperms)
  let no = "❌"
  let yes = "✅"
  let embed = new Discord.MessageEmbed({
    title: `Perms for ${user.user.tag}`,
    color: 'BLUE',
    thumbnail: message.author.displayAvatarURL(),
    fields: Object.entries(user.permissions.serialize())
      .reduce(
        (
          acc,
          current,
          i,
          a,
          bitfields = {
            ADMINISTRATOR: 0,
            VIEW_AUDIT_LOG: 0,
            VIEW_GUILD_INSIGHTS: 0,
            MANAGE_GUILD: 0,
            MANAGE_ROLES: 0,
            MANAGE_CHANNELS: 0,
            KICK_MEMBERS: 0,
            BAN_MEMBERS: 0,
            CREATE_INSTANT_INVITE: 0,
            CHANGE_NICKNAME: 0,
            MANAGE_NICKNAMES: 0,
            MANAGE_EMOJIS: 0,
            MANAGE_WEBHOOKS: 0,
            VIEW_CHANNEL: 1,
            SEND_MESSAGES: 1,
            SEND_TTS_MESSAGES: 1,
            MANAGE_MESSAGES: 1,
            EMBED_LINKS: 1,
            ATTACH_FILES: 1,
            READ_MESSAGE_HISTORY: 1,
            MENTION_EVERYONE: 1,
            USE_EXTERNAL_EMOJIS: 1,
            ADD_REACTIONS: 1
          }
        ) => (
          acc[
            [0, 1].some(e => bitfields[current[0]] === e)
              ? bitfields[current[0]]
              : 2
          ].push(
            `\`${current[0]
              .toLowerCase()
              .replace(/\_/g, " ")
              .replace(/(\b\w)/gi, w => w.toUpperCase())}\` | ${
              current[1] ? yes : no
            }`
          ),
          acc
        ),
        [[], [], []]
      )
      .map((e, c) => [
        `${
          c === 0 ? "General" : c === 1 ? "Text" : c === 2 ? "Voice" : "Unknown"
        } permissions`,
        e.join("\n")
      ])
      .map(field => {
        return {
          name: field[0],
          value:field[1],
          inline: true
        };
      })
  });
      
  message.channel.send(embed)
}
    }
