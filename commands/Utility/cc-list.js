const schema = require('../../models/custom-commands')
const Discord = require('discord.js')

module.exports = {
    name: 'cc-list',
    description: 'shows a list of all custom commands',
    botPermissions: ['EMBED_LINKS'],

    run : async(client, message, args) => {


        const nospec = new Discord.MessageEmbed()
        .setTitle('Error: No Custom Commands')
        .setDescription('There are no custom commands. Run the cc-create command to make one.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')


        const data = await schema.find({ Guild: message.guild.id });
        if(!data) return message.channel.send(nospec)
        message.channel.send(new Discord.MessageEmbed()
        .setColor('BLUE')
        .setDescription(
            data.map((cmd, i) => {
                return `${i + 1}: ${cmd.Command}`
            }).join('\n')
        )
        )
    }
}