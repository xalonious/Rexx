const Discord = require('discord.js')
const ms = require('ms');
module.exports = {
    name: 'mute',
    description: "mutes a member",
    usage: '<member> [time]',
    userPermissions: ['MANAGE_MESSAGES'],
    botPermissions: ['MANAGE_ROLES'],
    run : async(client, message, args) => {
      
        const target = message.mentions.users.first();
        if (target) {
            
            let mainRole = message.guild.roles.cache.find(role => role.name === 'Member');
            let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');

            const nomuterole = new Discord.MessageEmbed()
            .setTitle('Error: No Muted Role')
            .setDescription('I could not find the Muted role.')
            .setColor('RED')
            .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')
            
          if(!muteRole) return message.channel.send(nomuterole)

          const nomemberrole = new Discord.MessageEmbed()
            .setTitle('Error: No Member Role')
            .setDescription('I could not find the Member role.')
            .setColor('RED')
            .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')

          if(!mainRole) return message.channel.send(nomemberrole)
 
            let memberTarget = message.guild.members.cache.get(target.id);
 
            if (!args[1]) {
                memberTarget.roles.remove(mainRole.id);
                memberTarget.roles.add(muteRole.id);
                const embed = new Discord.MessageEmbed()
        .setTitle('User Muted!')
        .setDescription(`${message.author.username} muted ${memberTarget.displayName}.`)
        .setFooter(`Please remember to follow the rules to avoid a kick!`)
        .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Mute_Icon.svg/1200px-Mute_Icon.svg.png')
        .setColor('#FF0000')
        message.channel.send(embed)
                return
            }
            memberTarget.roles.remove(mainRole.id);
            memberTarget.roles.add(muteRole.id);
            const embed = new Discord.MessageEmbed()
        .setTitle('User Muted!')
        .setDescription(`${message.author.username} muted ${memberTarget.displayName} for ${ms(ms(args[1]))}`)
        .setFooter(`Please remember to follow the rules to avoid a kick!`)
        .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Mute_Icon.svg/1200px-Mute_Icon.svg.png')
        .setColor('#FF0000')
        message.channel.send(embed)
 
            setTimeout(function () {
                memberTarget.roles.remove(muteRole.id);
                memberTarget.roles.add(mainRole.id);
            }, ms(args[1]));
        } else {

            const notfound = new Discord.MessageEmbed()
            .setTitle('Error: Invalid Arguments')
            .setDescription('I could not find that user')
            .setColor('RED')
            .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')
            message.channel.send(notfound)
        }}}