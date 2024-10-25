const WelcomeSchema = require('../../models/WelcomeSchema')
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'configwelcome',
    description: 'configs the welcome system',
    usage: '<enable | disable | edit | vars> <channel> <message type> <welcome message>',
    userPermissions: ['MANAGE_GUILD'],

    run : async(client, message, args) => {
     
        const toggle = [
            "enable",
            "disable",
            "edit",
            "vars"
        ]

        if (!toggle.includes(args[0])) {
            return message.channel.send(`Please specify a valid option:  \`enable\`, \`disable\` or \`edit\` \`vars\` `)
        }

        if(args[0] === "vars") {

            const embed = new MessageEmbed()
            .setTitle("Welcome Message Variables")
            .setDescription(`**member**\n{member} - Pings the member that joined\n{member:tag} - Displays the members username and tag. e.g: </Xander>#9999\n\n**guild**\n{guild:name} - Displays the server name\n{guild:memberCount} - Displays the server member count`)
            .setColor("GREEN")

            return message.channel.send(embed)
        }

        if (args[0] === "enable") {

            await WelcomeSchema.findOne({ Guild: message.guild.id }, async (err, data) => {

                if (err) {
                    console.log(err)
                    message.channel.send(`There was a error when fetching the data. This has been reported to the devs`)
                    client.channels.cache.get("ERROR LOGS CHANNEL ID HERE").send(new MessageEmbed().setDescription(`There was an error when fetching the data\n\n${e}`).setFooter(`${message.guild.name} | ${message.guild.id}`))
                    return
                }

                if (data) {
                    return message.channel.send(`The welcome feature is already enabled. If you would like to change some settings, try using edit instead`)
                } else if (!data) {

                    // !welcome <enable | disable | edit> <channel> <message type> <welcome message>

                        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])

                        if (!channel) {
                            return message.channel.send(`You need to specify a valid channel`)
                        }

                        const msgType = [
                            "default",
                            "embed",
                            "image"
                        ]

                        if(!msgType.includes(args[2])) {
                            return message.channel.send(`You need to specify a message type: \`image\`, \`embed\` or \`default\``)
                        }

                        const msg = args.slice(3).join(" ")

                        if(!msg) {
                            return message.channel.send(`You need to specify a message for the bot to send. Remember we have a list for varibles, you can view them by doing: welcome -vars`)
                        }

                        await new WelcomeSchema({
                            Guild: message.guild.id,
                            Channel: channel.id,
                            Message: msg,
                            MessageType: args[2]
                        }).save();
                        
                        return message.channel.send(`Enabled the welcome feature`) 
                }
            })
        } // end of enable

        else if(args[0] === "edit") {

            await WelcomeSchema.findOne({ Guild: message.guild.id }, async(err, data) => {

                if(err) {
                    console.log(err)
                    message.channel.send(`There was a error when fetching the data. This has been reported to the devs`)
                    client.channels.cache.get("ERROR LOGS CHANNEL ID HERE").send(new MessageEmbed().setDescription(`There was an error when fetching the data\n\n${e}`).setFooter(`${message.guild.name} | ${message.guild.id}`))
                    return
                }

                const editable = [
                    "message",
                    "msgType",
                    "channel"
                ]

                if(!editable.includes(args[1])) {
                    return message.channel.send(`Please specify a valid option: \`message\`, \`msgType\` or \`channel\``)
                }

                if(args[1] === "message") {

                    const msg = args.slice(2).join(" ")

                    if(!msg) {
                        return message.channel.send(`You need to specify a message for the bot to send. Remember we have a list for varibles, you can view them by doing: welcome -vars`)
                    }
                    
                    await WelcomeSchema.findOneAndUpdate({ Guild: message.guild.id, Message: msg })

                    return message.channel.send(`Changed the welcome message`)
                } else if(args[1] === "msgType") {

                    const msgType = [
                        "default",
                        "embed",
                        "image"
                    ]

                    if(!msgType.includes(args[2])) {
                        return message.channel.send(`You need to specify a message type: \`image\`, \`embed\` or \`default\``)
                    }

                    await WelcomeSchema.findOneAndUpdate({ Guild: message.guild.id, MessageType: args[2] })

                    return message.channel.send(`Changed the welcome message type`)
                } else if(args[1] === "channel") {

                    const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2])

                    if(!channel) {
                        return message.channel.send(`You need to specify a valid channel via mention or id`)
                    }

                    await WelcomeSchema.findOneAndUpdate({ Guild: message.guild.id, Channel: channel.id })

                    return message.channel.send(`Changed the channel for the welcome message to be sent in`)
                }
            })
        } // end of edit

        else if(args[0] === "disable") {

            await WelcomeSchema.findOne({ Guild: message.guild.id }, async(err, data) => {

                if(err) {
                    console.log(err)
                    message.channel.send(`There was a error when fetching the data. This has been reported to the devs`)
                    client.channels.cache.get("ERROR CHANNEL ID HERE").send(new MessageEmbed().setDescription(`There was an error when fetching the data\n\n${e}`).setFooter(`${message.guild.name} | ${message.guild.id}`))
                    return
                }

                if(!data) {
                    return message.channel.send(`The welcome feature isnt enabled, so it cant be disabled`)
                } else if(data) {
                    await WelcomeSchema.findOneAndDelete({ Guild: message.guild.id }) 

                    return message.channel.send(`Disabled the welcome message feature`)
                }
            })
        }
    }
}