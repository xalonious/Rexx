const Discord = require('discord.js')
const axios = require('axios')

module.exports = {
    name: 'binary',
    description: 'encodes or decodes something to binary',
    usage: '<encode/decode> <text>',

    run : async(client, message, args) => {

        const noen = new Discord.MessageEmbed()
        .setTitle('Error')
        .setDescription('You did not specify whether you want to encode or decode.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')

        if(!args[0]) return message.channel.send(noen)

        const query = args.shift().toLowerCase();
        const word = args.join(" ")


        const nde = new Discord.MessageEmbed()
        .setTitle('Error')
        .setDescription('You did not specify any text to encode.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')

        const ndeee = new Discord.MessageEmbed()
        .setTitle('Error')
        .setDescription('You did not specify any text to decode.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')


        const inv = new Discord.MessageEmbed()
        .setTitle('Error')
        .setDescription('That option is invalid.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')



        if(query === 'encode') {
            if(!word) return message.channel.send(nde)
            const { data } = await axios.get(`https://some-random-api.ml/binary?text=${encodeURIComponent(word)}`)

            message.channel.send(data.binary ?? 'An error occured', {
                code: "",
            })
        } else if(query === 'decode') {
            if(!word) return message.channel.send(ndeee)
            const { data } = await axios.get(`https://some-random-api.ml/binary?decode=${encodeURIComponent(word)}`)

            message.channel.send(data.text ?? 'An error occured', {
                code: "",
            })
        } else return message.channel.send(inv)

    }
}