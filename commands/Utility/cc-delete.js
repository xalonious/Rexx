const schema = require('../../models/custom-commands')
const Discord = require('discord.js')

module.exports = {
    name: 'cc-delete',
    description: 'deletes a custom command',
    usage: '<command name>',
    userPermissions: ['MANAGE_GUILD'],

    run : async(client, message, args) => {
        

        const name = args[0];
        


        const nospec = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not specify a command name.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')






const nospecccc = new Discord.MessageEmbed()
        .setTitle('Error: Does Not Exist')
        .setDescription('There is no custom command with that name.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')


        const succes = new Discord.MessageEmbed()
        .setTitle('Success')
        .setDescription('Succesfully removed custom command.')
        .setColor('GREEN')
        .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/whatsapp/238/white-heavy-check-mark_2705.png')


        if(!name) return message.channel.send(nospec)

        const data = await schema.findOne({ Guild: message.guild.id, Command: name});
        if(!data) return message.channel.send(nospecccc)
        await schema.findOneAndDelete({ Guild: message.guild.id, Command: name});
        message.channel.send(succes)
    }}