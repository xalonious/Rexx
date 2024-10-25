const Discord = require('discord.js')
const { confirmation } = require("reconlx");
module.exports = {
    name: "kick",
    description: "kicks a user",
    usage: '<user> [reason]',

    run : async(client, message, args) => {
      
      if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send('I do not have the kick members permission, please make sure the Rex role has this permission to use this command!')
      
        const nopermsembed = new Discord.MessageEmbed()
        .setTitle('Error: Missing Permissions')
        .setDescription('You do not have the proper permissions to use this command.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')
        .setFooter('Required permission: Kick Members')
         if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(nopermsembed)
      
      
        const mentionMember = message.mentions.members.first();
        let reason = args.slice(1).join(" "); 
        if (!reason) reason = "No reason given";

        const embed = new Discord.MessageEmbed()
        .setTitle(`You were kicked from **${message.guild.name}**`)
        .setDescription(`Reason: ${reason}`)
        .addField('Kicked by:', `${message.author.tag}`)
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter(client.user.tag, client.user.displayAvatarURL())

        const noargs = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not mention a user you want me to kick.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')

        if (!args[0]) return message.channel.send(noargs);

        const nomember = new Discord.MessageEmbed()
        .setTitle('Error: Invalid user')
        .setDescription('I could not find that user')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')
        



        if(!mentionMember) return message.channel.send(nomember);

        const memberbannable = new Discord.MessageEmbed()
        .setTitle('Error: No Permission')
        .setDescription('I do not have permission to kick that user, please make sure I have the proper permissions and my highest role is above theirs.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')
       
        if(mentionMember.id === message.author.id) return message.channel.send('Why would you want to kick yourself lol')
      
      if(mentionMember.id === client.user.id) return message.channel.send('im not gonna kick myself lol')

        if(message.member.roles.highest.position <= mentionMember.roles.highest.position) return message.channel.send('You cannot kick someone that has an equal/higher role than you lol')
      
        if(!mentionMember.bannable) return message.channel.send(memberbannable)


        const successs = new Discord.MessageEmbed()
        .setTitle('Success')
        .setDescription(`I succesfully kicked ${mentionMember.user.tag}`)
        .addField('Reason:', reason)
        .setColor('GREEN')
        .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/whatsapp/238/white-heavy-check-mark_2705.png')


   

  
              mentionMember.send(embed)
              mentionMember.kick({
                reason: reason
              }).then(() => message.channel.send(successs))
            client.modlogs({
              Member: mentionMember,
              Reason: reason,
              Color: 'RED',
              Action: 'kick',
              Moderator: message.author
            }, message)
          
         
         

     


        
    }
}