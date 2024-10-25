const Discord = require('discord.js')
const db = require('../../reconDB')

module.exports = {
    name: 'setautorole',
    description: 'sets the autorole for the server',
    usage: '<role>',
    userPermissions: ['MANAGE_GUILD'],
    botPermissions: ['MANAGE_ROLES'],

    run : async(client, message, args) => {
        

        const noargs = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not specify a role.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png') 



        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
        if(!role) return message.channel.send(noargs)

        await db.set(`autorole-${message.guild.id}`, role.id);

        const succes = new Discord.MessageEmbed()
        .setTitle('Success')
        .setDescription(`${role.name} has been saved as autorole!`)
        .setColor('GREEN')
        .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/whatsapp/238/white-heavy-check-mark_2705.png')
        
        message.channel.send(succes)
    }
}

