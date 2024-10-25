const Discord = require('discord.js');
const { Canvas } = require('canvacord')
const { MessageAttachment } = require('discord.js')
module.exports = {
    name: 'spank',
    description: 'spank someone',
    usage: '<user>',

    run : async(client, message, args) => {
        const user = message.mentions.users.first()

        const noargs = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not specify someone to spank.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')


        if(!user) return message.channel.send(noargs)

        const avatar = user.displayAvatarURL({ format: "png" });

        const image = await Canvas.spank(message.author.displayAvatarURL({ format: 'png'}), avatar)

        message.channel.send(
            new MessageAttachment(image, "image.gif")
        )
    }
}