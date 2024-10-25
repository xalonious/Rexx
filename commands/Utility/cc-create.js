const schema = require('../../models/custom-commands')
const Discord = require('discord.js')

module.exports = {
    name: 'cc-create',
    description: 'creates a custom command',
    usage: '<command name> <response>',
    userPermissions: ['MANAGE_GUILD'],

    run : async(client, message, args) => {
       

        const name = args[0];
        const response = args.slice(1).join(" ")


        const nospec = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not specify a command name.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')


        const nospecc = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not specify a response.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')




const nospecccc = new Discord.MessageEmbed()
        .setTitle('Error: Already Exists')
        .setDescription('There is already a custom command with that name.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')


        const succes = new Discord.MessageEmbed()
        .setTitle('Success')
        .setDescription('Succesfully saved custom command.')
        .setColor('GREEN')
        .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/whatsapp/238/white-heavy-check-mark_2705.png')


        if(!name) return message.channel.send(nospec)
        if(!response) return message.channel.send(nospecc)

        const data = await schema.findOne({ Guild: message.guild.id, Command: name});
        if(data) return message.channel.send(nospecccc)
        const newData = new schema({
            Guild: message.guild.id,
            Command: name,
            Response: response
        })
        await newData.save()
        message.channel.send(succes)
    }
}