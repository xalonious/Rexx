const { MessageEmbed } = require("discord.js");


module.exports = {
    name: 'loop',
    aliases : ['repeat'],
    description: 'Enables loop mode',

    run: async(client, message, args) => {
       
        if(!message.member.voice.channel) return message.channel.send('You must be in the vc to loop!')

        client.player.setRepeatMode(message, parseInt(args[0]));
        message.channel.send('Loop enabled!')

    }
}