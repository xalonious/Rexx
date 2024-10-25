const ownerid = require('../../config.json').ownerid
const Discord = require('discord.js')
const { inspect } = require('util')
module.exports = {
    name: 'eval',
    aliases : ['evaluate'],
    description: 'evaluates a line of code',
    usage: '<code>',

    run : async(client, message, args) => {
        const nopermsembed = new Discord.MessageEmbed()
        .setTitle('Error: Missing Permissions')
        .setDescription('Only the bot creator can use this command.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')
        if(message.author.id !== ownerid) return message.channel.send(nopermsembed)
       


        const nocode = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not specify any code to evaluate.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')


        const code = args.join(' ')
        if(!code) return message.channel.send(nocode)

        try {
            const result = await eval(code)
            let output = result;
            if(typeof result !== 'string') {
                output = inspect(result)
            }
            
            message.channel.send(output, { code: 'js'})
        } catch (error) {
            message.channel.send(error)
        }
    }
}