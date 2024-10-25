const Discord = require('discord.js')
module.exports = {
    name: 'lockdown',
    description: 'locks down the server',
    usage: '<true/false>',
    userPermissions: ['ADMINISTRATOR'],
    botPermissions: ['MANAGE_ROLES'],

    run : async(client, message, args) => {

   
        const role = message.guild.roles.everyone;

        const nospec = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not specify true or false.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')

        if(!args.length) return message.channel.send(nospec)


        const novalid = new Discord.MessageEmbed()
        .setTitle('Error: Invalid Arguments')
        .setDescription('The option you have stated is invalid, use either true or false.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')

        const query = args[0].toLowerCase()
        if(!['true', 'false'].includes(query)) return message.channel.send(novalid)


        const succes = new Discord.MessageEmbed()
        .setTitle('Success')
        .setDescription('Server is unlocked!')
        .setColor('GREEN')
        .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/whatsapp/238/white-heavy-check-mark_2705.png')

        const perms = role.permissions.toArray()

        const successss = new Discord.MessageEmbed()
        .setTitle('Success')
        .setDescription('Server is now locked down.')
        .setColor('GREEN')
        .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/whatsapp/238/white-heavy-check-mark_2705.png')


        if(query === 'false'){
            perms.push('SEND_MESSAGES');
            await role.edit({ permissions: perms})
            message.channel.send(succes)
        } else {
            const newPerms = perms.filter((perm) => perm !== 'SEND_MESSAGES');
            await role.edit({ permissions: newPerms})
            message.channel.send(successss)


        }
    }

}