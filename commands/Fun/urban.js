const Discord = require('discord.js');
const urban = require("relevant-urban");

module.exports = {
    name: 'urban',
    aliases : ['definition', 'define'],
    description: 'searches the definition of a word',
    usage: '<word>',
    run : async(client, message, args) => {


        const noargs = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not mention a word to search.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')

if (!args[0]) return message.channel.send(noargs)



    let result = await urban(args[0]).catch(e => {


        const notfound = new Discord.MessageEmbed()
        .setTitle('Error: Invalid word')
        .setDescription('I could not find that word.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')
        return message.channel.send(notfound)

    })



    const embed = new Discord.MessageEmbed()

    .setColor(0x7289DA)

    .setTitle(result.word)

    .setURL(result.urbanURL)

    .setDescription(`**Definition:** \n*${result.definition}* \n\n**Example:** \n*${result.example}*`)

    .addField("Author", result.author, true)

    .addField("Rating", `👍 ${result.thumbsUp.toLocaleString()} | 👎 ${result.thumbsDown.toLocaleString()}`)



    if (result.tags.length > 0 && result.tags.join(" ").length < 1024) {

        embed.addField("Tags", result.tags.join(", "), true);

    }



    return message.channel.send(embed)
}}