const Discord = require('discord.js')

module.exports = {
    name: 'play',
    aliases : ['p'],
    description: 'plays a song in a voice channel',
    usage: '<song>',

    run : async(client, message, args) => {
        const noa = new Discord.MessageEmbed()
        .setTitle('Error: Not In Vc')
        .setDescription('You must be in a vc to play a song.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png') 


        const nq = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not specify a song.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png') 

        if(!message.member.voice.channel) return message.channel.send(noa)

        const query = args.join(" ")
        if(!query) return message.channel.send(nq)
        
        await client.player.play(message, query)
    }
}