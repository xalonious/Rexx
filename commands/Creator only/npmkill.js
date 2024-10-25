const Discord = require('discord.js')
module.exports = {
    name: "npmkill",
    aliases : ['shutdown'],
    description: 'kills the node process',
    run: async (client, message, args) => {

        const nopermsembed = new Discord.MessageEmbed()
        .setTitle('Error: Missing Permissions')
        .setDescription('Only the bot creator can use this command.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')
        if (message.author.id !== '531479392128598027') return message.channel.send(nopermsembed)
        
        await message.channel.send(`I shall now kill myself. Goodbye. X_X`)
        process.exit();
    }
}