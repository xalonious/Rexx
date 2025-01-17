const Discord = require('discord.js')
const Schema = require('../../models/suggestions')
module.exports = {
    name: 'accept-suggestion',
    aliases : ['acceptsug'],
    description: 'accepts a suggestion',
    usage: '<messageid> [feedback]',
    userPermissions: ['MANAGE_MESSAGES'],

    run : async(client, message, args) => {
        


        const nochan = new Discord.MessageEmbed()
        .setTitle('Error: No Suggestions Channel')
        .setDescription('Please create a channel named suggestions to use this command!')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')


        const noid = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not specify a valid message id.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')


        const noqu = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not specify any feedback.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')


        const messageID = args[0];
        if(!messageID) return message.channel.send(noid)


        let acceptQuery = args.slice(1).join(' ');
        if(!acceptQuery) acceptQuery = 'Good Suggestion!'

        const sugdata = await Schema.findOne({ Guild: message.guild.id})
        
            const suggestionchannel = message.guild.channels.cache.get(sugdata.Channel)
            if(!suggestionchannel) return message.channel.send(nochan)
           const suggestedEmbed = await suggestionchannel.messages.fetch(messageID)

            const data = suggestedEmbed.embeds[0];
           const acceptEmbed = new Discord.MessageEmbed()
           .setAuthor(data.author.name, data.author.iconURL)
           .setDescription(data.description)
           .setColor('GREEN')
           .addField("STATUS (ACCEPTED)", `Feedback by ${message.member}: ${acceptQuery}`)


           suggestedEmbed.edit(acceptEmbed)
           message.channel.send('Suggestion has been accepted.')

          const user = await client.users.cache.find((u) => u.tag === data.author.name)
          user.send(`Your suggestion in ${message.guild.name} has been accepted by ${message.member}: ${acceptQuery}`)
      
    }
}