const schema = require('../../models/command')
const Discord = require('discord.js')
module.exports = {
    name: 'cmd-disable',
    description: 'disables a command',
    usage: '<command>',
    userPermissions: ['MANAGE_GUILD'],

    run : async(client, message, args) => {
      
        const cmd = args[0]

        const nopcmd = new Discord.MessageEmbed()
        .setTitle('Error')
        .setDescription('You did not specify a command to disable.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png') 

        if(!cmd) return message.channel.send(nopcmd)


        const nope = new Discord.MessageEmbed()
        .setTitle('Error')
        .setDescription('That command does not exist.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png') 


        const nopee = new Discord.MessageEmbed()
        .setTitle('Error')
        .setDescription('That command has already been disabled.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png') 

        if(!!client.commands.get(cmd) === false) return message.channel.send(nope)
        schema.findOne({ Guild: message.guild.id}, async(err, data) => {
            if(err) throw err;
            if(data) {
                if(data.Cmds.includes(cmd)) return message.channel.send(nopee)
                data.Cmds.push(cmd)
            } else {
                data = new schema({
                    Guild: message.guild.id,
                    Cmds: cmd
                })
            }
            await data.save();
            const succes = new Discord.MessageEmbed()
        .setTitle('Success')
        .setDescription(`Succesfully disabled the ${cmd} command.`)
        .setColor('GREEN')
        .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/whatsapp/238/white-heavy-check-mark_2705.png')
        message.channel.send(succes)
        })
    }

}