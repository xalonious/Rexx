const Discord = require('discord.js')
module.exports = {
    name: 'setnickname',
    aliases : ['setnick'],
    timeout : 5000,
    description: 'sets the nickname of a user',
    usage: '<user> <nickname>',
    userPermissions: ['MANAGE_NICKNALES'],
    botPermissions: ['MANAGE_NICKNAMES'],
    run : async(client, message, args) => {


        const nomention = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not mention a user.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')
        

        const target = message.mentions.users.first()
        if(!target) return message.channel.send(nomention)

        const member = message.guild.members.cache.get(target.id)

        const nonick = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not specify a nickname')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')
        
    
        args.shift()
        const nickname = args.join(' ')
        if(!nickname) return message.channel.send(nonick)

    
        member.setNickname(nickname)

        const succes = new Discord.MessageEmbed()
        .setTitle('Success')
        .setDescription(`I succesfully changed their nickname to ${nickname}`)
        .setColor('GREEN')
        .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/whatsapp/238/white-heavy-check-mark_2705.png')
        

        message.channel.send(succes)
        
    }
    }