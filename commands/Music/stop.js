
module.exports = {
    name: 'stop',
    description: 'stops the music',

    run : async(client, message, args) => {
       
        
        if(!message.member.voice.channel) return message.channel.send('You must be in the vc to stop the music!')

        try {
            client.player.stop(message)
            message.channel.send('Goodbye. :smiling_face_with_tear:')
        } catch (error) {
            message.channel.send('There are no songs playing')
        }
       

    }} 