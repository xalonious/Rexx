const Discord = require('discord.js')
const schema = require('../../models/blacklist-servers')
const config = require('../../config.json')
const ownerid = config.ownerid

module.exports = {
    name: 'unblacklistserver',
    description: 'unblacklists a server',
    usage: '<serverid>',

    run : async(client, message, args) => {
        const nopermsembed = new Discord.MessageEmbed()
        .setTitle('Error: Missing Permissions')
        .setDescription('Only the bot creator can use this command.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')


        const noargs = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not specify the server id.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')



        const noser = new Discord.MessageEmbed()
        .setTitle('Error: Invalid Arguments')
        .setDescription('I am not in that server.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')



        const alr = new Discord.MessageEmbed()
        .setTitle('Error: Not Blacklisted')
        .setDescription('That server is not blacklisted')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')



        const succ = new Discord.MessageEmbed()
        .setTitle('Success')
        .setDescription('Server has been unblacklisted.')
        .setColor('GREEN')
        .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/whatsapp/238/white-heavy-check-mark_2705.png')



        if(message.author.id !== ownerid) return message.channel.send(nopermsembed)
        const id = args[0];
        if(!id) return message.channel.send(noargs)
        if(!client.guilds.cache.has(id)) return message.channel.send(noser)

        schema.findOne({ Server: id}, async(err, data) => {
            if(!data) return message.channel.send(alr)
            data.delete()
            message.channel.send(succ)
        })
        
    }
}