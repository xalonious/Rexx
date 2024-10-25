const Discord = require('discord.js');
const child = require('child_process');

module.exports = {
    name: 'terminal',
    aliases : ['term'],
    description: 'runs a command on the bot terminal',
    usage: '<command>',

    run : async(client, message, args) => {
        const nopermsembed = new Discord.MessageEmbed()
        .setTitle('Error: Missing Permissions')
        .setDescription('Only the bot creator can use this command.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')
        if(message.author.id !== '531479392128598027') return message.channel.send(nopermsembed)

        const command = args.join(" ");

        const noarrr = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not specify a command.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')


        if(!command) return message.channel.send(noarrr)

        child.exec(command, (err, res) => {
            if(err) return console.log(err);
            message.channel.send(res.slice(0, 2000), { code: 'js' })
        })
    }
}