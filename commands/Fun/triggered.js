const Discord = require('discord.js');
const { Canvas } = require('canvacord')
const { MessageAttachment } = require('discord.js')
module.exports = {
    name: 'triggered',
    description: 'makes a user triggered',
    usage: '[user]',

    run : async(client, message, args) => {
        const user = message.mentions.users.first() || message.author;

        const avatar = user.displayAvatarURL({ format: "png" });

        const image = await Canvas.trigger(avatar)

        message.channel.send(
            new MessageAttachment(image, "image.gif")
        )
    }
}