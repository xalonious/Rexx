const Discord = require('discord.js');
const { Util } = require('discord.js')

module.exports = {
    name: 'steal-emoji',
    aliases : ['emojisteal'],
    description: 'Allows you to steal emojis and add them to your own server',
    usage: '<emoji(s)>',
    userPermissions: ['MANAGE_EMOJIS'],
    botPermissions: ['MANAGE_EMOJIS'],

    run : async(client, message, args) => {
      

        const noemoji = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not specify any emojis to steal.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')


        const su = new Discord.MessageEmbed()
        .setTitle('Success')
        .setDescription('Emoji(s) have been added succesfully.')
        .setColor('GREEN')
        .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/whatsapp/238/white-heavy-check-mark_2705.png')

        if(!args.length) return message.channel.send(noemoji)

        for(const rawEmoji of args){
            const parsedEmoji = Util.parseEmoji(rawEmoji)

            if (parsedEmoji.id){

                const extension = parsedEmoji.animated ? ".gif" : ".png";
                const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + extension}`
                message.guild.emojis.create(url, parsedEmoji.name).then((emoji) => message.channel.send(su))
                
            }
        }
    }
}