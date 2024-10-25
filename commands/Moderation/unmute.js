const Discord = require('discord.js')
module.exports = {
    name: 'unmute',
    description: "unmutes a member",
    usage: '<user>',
    userPermissions: ['MANAGE_MESSAGES'],
    botPermissions: ['MANAGE_ROLES'],
    run : async(client, message, args) => {
      
        const target = message.mentions.users.first();
        if(target){
            let mainRole = message.guild.roles.cache.find(role => role.name === 'Member');
            let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');


            const nomuterole = new Discord.MessageEmbed()
            .setTitle('Error: No Muted Role')
            .setDescription('I could not find the muted role.')
            .setColor('RED')
            .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')


            const nomemberrole = new Discord.MessageEmbed()
            .setTitle('Error: No Member Role')
            .setDescription('I could not find the Member role.')
            .setColor('RED')
            .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')

        if(!muteRole) return message.channel.send(nomuterole)
        if(!mainRole) return message.channel.send(nomemberrole)
 
            let memberTarget = message.guild.members.cache.get(target.id);
 
            memberTarget.roles.remove(muteRole.id);
            memberTarget.roles.add(mainRole.id);
            const embed = new Discord.MessageEmbed()
            .setTitle('User unmuted!')
            .setDescription(`${message.author.username} unmuted ${memberTarget.displayName}`)
            .setThumbnail('https://cdn.iconscout.com/icon/premium/png-512-thumb/unmute-2229486-1858295.png')
            .setColor('GREEN')
            message.channel.send(embed)
        } else{

            const notfind = new Discord.MessageEmbed()
            .setTitle('Error: Not Found')
            .setDescription('I could not find that user.')
            .setColor('RED')
            .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')
            message.channel.send(notfind)
        }
    }
}
