const Discord = require('discord.js')
const { confirmation } = require("reconlx");
module.exports = {
    name: "ban",
    description: "bans a user",
    usage: '<user> [reason]',
    userPermissions: ['BAN_MEMBERS'],
    botPermissions: ['BAN_MEMBERS'],

    run : async(client, message, args) => {
      
     
      
      
        const mentionMember = message.mentions.members.first();
        let reason = args.slice(1).join(" "); 
        if (!reason) reason = "No reason given";

        const embed = new Discord.MessageEmbed()
        .setTitle(`You were banned from **${message.guild.name}**`)
        .setDescription(`Reason: ${reason}`)
        .addField('Banned by:', `${message.author.tag}`)
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter(client.user.tag, client.user.displayAvatarURL())

        const noargs = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not mention a user you want me to ban.')
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
        .setDescription('I do not have permission to ban that user, please make sure I have the proper permissions and my highest role is above theirs.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')
        
        if(mentionMember.id === '531479392128598027') return message.channel.send('not gonna ban my creator, thanks')
       
        if(mentionMember.id === message.author.id) return message.channel.send('Why would you want to ban yourself lol')
      
      if(mentionMember.id === client.user.id) return message.channel.send('im not gonna ban myself lol')

        if(message.member.roles.highest.position <= mentionMember.roles.highest.position) return message.channel.send('You cannot ban someone that has an equal/higher role than you lol')
      
        if(!mentionMember.bannable) return message.channel.send(memberbannable)


        const successs = new Discord.MessageEmbed()
        .setTitle('Success')
        .setDescription(`I succesfully banned ${mentionMember.user.tag}`)
        .addField('Reason:', reason)
        .setColor('GREEN')
        .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/whatsapp/238/white-heavy-check-mark_2705.png')


    
              mentionMember.send(embed)
              mentionMember.ban({
                reason: reason
              }).then(() => message.channel.send(successs))
            client.modlogs({
              Member: mentionMember,
              Action: 'ban',
              Color: 'RED',
              Reason: reason,
              Moderator: message.author
            }, message)
          
         
      }
      
      
}