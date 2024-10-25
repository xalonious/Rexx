const { Util } = require('discord.js');
const Discord = require('discord.js')
const Schema = require('../../models/reaction-roles')

module.exports = {
    name: 'reactionpanel',
    description: 'sends the panel for reaction roles!',
    userPermissions: ['MANAGE_ROLES', 'MANAGE_GUILD'],
    botPermissions: ['MANAGE_ROLES', 'ADD_REACTIONS', 'EMBED_LINKS'],
    
    run : async(client, message, args) => {
        

        const norr = new Discord.MessageEmbed()
        .setTitle('Error: No Reaction Roles')
        .setDescription('This server does not have any reacion roles set up yet, run the addreactionrole command to do this!')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png') 

        const channel = message.mentions.channels.first() || message.channel;

        Schema.findOne({ Guild: message.guild.id}, async(err, data) => {
            if(!data) return message.channel.send(norr)
            const mapped = Object.keys(data.Roles)
            .map((value, index) => {
                const role = message.guild.roles.cache.get(data.Roles[value][0])
                return `${index + 1}) ${data.Roles[value][1].raw} - ${role}`
            }).join('\n\n');

            channel.send(new Discord.MessageEmbed().setColor('ffc0cb').setDescription(mapped)).then((msg) => {
                data.Message = msg.id;
                data.save()

                const reactions = Object.values(data.Roles).map((val) => val[1].id ?? val[1].raw)
                reactions.map((emoji) => msg.react(emoji))
            })
        })
    }
}