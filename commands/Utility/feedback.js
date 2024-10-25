const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js')
module.exports = {
    name: "feedback",
    description: "Send feedback to the developer",
    usage: '<feedback>',

    run : async(client, message, args) => {

        let suggestion = args.slice(0).join(" ");
        let SuggestionChannel = client.channels.cache.get('848181788505014302')
        const noargs = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not send any feedback.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')

        if(!args[0]) return message.channel.send(noargs)
        const embed = new MessageEmbed()
            .setTitle("New Suggestion")
            .setDescription(suggestion)
            .setColor("RANDOM")
            .setFooter(`${message.author.tag} | ID: ${message.author.id}`)
            .setTimestamp()
        SuggestionChannel.send(embed).then(msg => {
            msg.react("👍🏼")
            msg.react("👎🏼")


            const successss = new Discord.MessageEmbed()
        .setTitle('Success')
        .setDescription('Your feedback has been sent.')
        .setColor('GREEN')
        .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/whatsapp/238/white-heavy-check-mark_2705.png')

        message.channel.send(successss)
        });
    }
}