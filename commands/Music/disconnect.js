module.exports = {
    name: 'disconnect',
    aliases : ['dc', 'fuckoff', 'suckadick'],
    description: 'disconnects the bot from the voice channel',
    run : async(client, message, args) => {
        const voiceChannel = message.member.voice.channel;
 
        if(!voiceChannel) return message.channel.send("You need to be in a voice channel to stop the music!");
        await voiceChannel.leave();
        await message.channel.send('Goodbye. :smiling_face_with_tear:')
 
    }
}