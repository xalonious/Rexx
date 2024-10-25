const Discord = require('discord.js')
const Schema = require('../../models/reaction-roles')

module.exports = {
    name: 'resetreactionroles',
    description: 'resets the reaction roles',
    userPermissions: ['MANAGE_ROLES'],

    run : async(client, message, args) => {
       


        const succes = new Discord.MessageEmbed()
        .setTitle('Success')
        .setDescription('Succesfully reset reaction roles!')
        .setColor('GREEN')
        .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/whatsapp/238/white-heavy-check-mark_2705.png')


        

        


        await Schema.findOneAndDelete({ Guild: message.guild.id}).then(() => message.channel.send(succes))

        
    }
}