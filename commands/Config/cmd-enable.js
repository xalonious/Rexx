const schema = require('../../models/command')
const Discord = require('discord.js')
module.exports = {
    name: 'cmd-enable',
    description: 'enables a command',
    usage: '<command>',
    userPermissions: ['MANAGE_GUILD'],

    run : async(client, message, args) => {
       
        const cmd = args[0]

        const nopcmd = new Discord.MessageEmbed()
        .setTitle('Error')
        .setDescription('You did not specify a command to enable.')
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
        .setDescription('That command has already been enabled.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png') 

        if(!!client.commands.get(cmd) === false) return message.channel.send(nope)
        schema.findOne({ Guild: message.guild.id}, async(err, data) => {
            if(err) throw err;
            if(data) {
                if(data.Cmds.includes(cmd)) {
                    let commandNumber;

                    for(let i = 0; i < data.Cmds.length; i++) {
                        if(data.Cmds[i] === cmd) data.Cmds.splice(i, 1)
                    }
                    await data.save();

                    const succes = new Discord.MessageEmbed()
        .setTitle('Success')
        .setDescription(`The ${cmd} command has succesfully been enabled!`)
        .setColor('GREEN')
        .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/whatsapp/238/white-heavy-check-mark_2705.png')



        message.channel.send(succes)
                } else return message.channel.send('That command is not disabled!')
            }
        })
    }

}