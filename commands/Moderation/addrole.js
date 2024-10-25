
const Discord = require('discord.js');


module.exports = {
    name : 'addrole',
    aliases : ['giverole'],
    timeout : 5000,
    description: 'Adds a role to a user',
    usage: '<user> <role>',
    userPermissions: ['MANAGE_ROLES'],
    botPermissions: ['MANAGE_ROLES'],
    run : async(client, message, args) => {
        
        /**
         * @param {Message} message
         */


        
        
        const notarget = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not mention a user to add a role to.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')
        

        const target = message.mentions.members.first() 
        if(!target) return message.channel.send(notarget) 

        const norole = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not mention a role to add to the user.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')
        

        const role = message.mentions.roles.first() 
        if(!role) return message.channel.send(norole) 
        await target.roles.add(role) 
        
        const succes = new Discord.MessageEmbed()
        .setTitle('Success')
        .setDescription(`I succesfully gave the role to ${target.user.username}`)
        .setColor('GREEN')
        .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/whatsapp/238/white-heavy-check-mark_2705.png')
       


        message.channel.send(succes);
    }
}