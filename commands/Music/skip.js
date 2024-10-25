const Discord = require("discord.js");


module.exports = {
    name: 'skip',
    description: 'skips a song',

    run: async(client, message, args) => {
        const noa = new Discord.MessageEmbed()
        
        if(!message.member.voice.channel) return message.channel.send('You must be in the vc to skip the song!')

        client.player.skip(message);
        message.channel.send('Skipped song!')
    }
}