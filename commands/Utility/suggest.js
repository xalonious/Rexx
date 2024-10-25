const Discord = require('discord.js')
const Schema = require('../../models/suggestions')
module.exports = {
    name: 'suggest',
    description: 'make a suggestion for the server',
    usage: '<suggestion>',
    botPermissions: ['EMBED_LINKS'],

    run : async(client, message, args) => {
        const nosug = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not specify a suggestion.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')


        const nochan = new Discord.MessageEmbed()
        .setTitle('Error: No Suggestions Channel')
        .setDescription('There is no suggestions channel set up for this server, use the setsuggestionschannel command to do so!')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')

        const succes = new Discord.MessageEmbed()
            .setTitle('Success')
            .setDescription(`Succesfully submitted suggestion!`)
            .setColor('GREEN')
            .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/whatsapp/238/white-heavy-check-mark_2705.png')


            Schema.findOne({ Guild: message.guild.id }, async(e, data) => {
                if(!data) return message.channel.send(nochan)
                const sugchannel = message.guild.channels.cache.get(data.Channel)
        let suggestionQuery = args.join(" ")
        if(!suggestionQuery) return message.channel.send(nosug)

        const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`**Suggestion**: ${suggestionQuery}`)
        .setColor('RANDOM')
        .setTimestamp()
        .addField("Status", 'PENDING')

        message.channel.send(succes)
        sugchannel.send(embed).then(embed => {
            embed.react("👍")
            embed.react("👎")
            })

       
        })
    }
}