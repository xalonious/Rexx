const figlet = require('figlet');
const Discord = require('discord.js')
module.exports = {
    name: "ascii",
    description: "Converts text to ascii",
    usage: '<text>',

    run : async(client, message, args) => {


        const notext = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not specify any text.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')

        if(!args[0]) return message.channel.send(notext)

        msg = args.join(" ");

        figlet.text(msg, function (err, data){
            if(err){
                console.log('Something went wrong');
                console.dir(err);
            }


            const tooobig = new Discord.MessageEmbed()
        .setTitle('Error')
        .setDescription('Please provide text short than 2000 characters.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')

            if(data.length > 2000) return message.channel.send(tooobig)

            message.channel.send('```' + data + '```')
        })
    }
}