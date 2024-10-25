module.exports = {
    name: 'queue',
    aliases : ['q'],
    description: 'gives you the current queue for songs',

    run : async(client, message, args) => {
        let queue = client.player.getQueue(message);
        message.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
            `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
        ).slice(0, 10).join("\n"));
    }
    }
