const Discord = require('discord.js');

module.exports = {
    name: 'bans',
    aliases : ['listbans'],
    description: 'lists all users banned in the server',
    userPermissions: ['BAN_MEMBERS'],
    botPermissions: ['BAN_MEMBERS'],

    run : async(client, message, args) => {

        const fetchbans = message.guild.fetchBans();
        const bannedMembers = (await fetchbans).map((member) => `\`${member.user.tag}\``).join(" ")
        message.channel.send(bannedMembers) 
    }
}