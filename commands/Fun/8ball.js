const Discord = require('discord.js')
module.exports = {
    name: '8ball',
    description: 'Ask a question and it responds with what it thinks',
    usage: '<question>',
    run: async(client, message, args) => {
        let question = args.slice(0).join(" ");
        

        const noquestion = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not specify a question.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')
        if(!question) return message.channel.send(noquestion)
        else {
            let answers = [
                'It is certain',
                'Without a doubt',
                'You may rely on it',
                'Yes definitely',
                'It is decidedly so',
                'As I see it, yes',
                'Most likely',
                'Yes',
                'Outlook good',
                'Signs point to yes',
                'Reply hazy try again',
                'Better not tell you now',
                'Ask again later',
                'Cannot predict now',
                'Concentrate and ask again',
                'Don’t count on it',
                'Outlook not so good',
                'My sources say no',
                'Very doubtful',
                'My reply is no'
        ];
            let response = answers[Math.floor(Math.random() * answers.length)];

            message.channel.send('🎱 | ' + response)
            
      
        }
        }
    }
;