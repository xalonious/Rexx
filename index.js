const moment = require('moment');
const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js');
const { MessageAttachment } = require('discord.js')
const {Collection, Client} = require('discord.js')
const fs = require('fs')
const client = new Client({
 disableEveryone: true,
})
const mongoose = require('mongoose');
const canvas = require('discord-canvas')
const ms = require('ms')
require('discord-buttons')(client)
const config = require('./config.json');
const mongoConnect = config.mongodbstring
mongoose.connect(mongoConnect, {
    useUnifiedTopology : true,
    useNewUrlParser : true,
    useFindAndModify: false,
}).then(console.log('[CONNECTION ESTABLISHED] => Connected to Database.'))
const distube = require('distube')
const player = new distube(client)
const logschannel = '807944395818663946'
const mSchema = require('./models/member-count')
const ccSchema = require('./models/custom-commands')
const antialt = require('./models/antialt')
const db = require('./reconDB')
const dbb = require('./models/command')
const reactSchema = require('./models/reaction-roles')
const { blacklistedWords } = require('./Collection')
const blacklist = require('./models/blacklist')
const blacklistguild = require('./models/blacklist-servers')
const prefixSchema = require('./models/prefix')
const recon = require('./reconDB')

const Timeout = new Collection()
const { ParsingResult } = require('chrono-node/dist/results');
const { getCommands } = require('./utils')
const path = require('path');
const prefix = config.prefix
const token = config.token
module.exports = client;
client.snipes = new Collection()
client.commands = new Collection();
client.aliases = new Collection();
const modlogsSchema = require('./models/modlogs')
client.modlogs = async function({ Moderator, Member, Action, Color, Reason}, message) {
const data = await modlogsSchema.findOne({ Guild: message.guild.id });
if(!data) return;

const channel = message.guild.channels.cache.get(data.Channel)
const logsEmbed = new MessageEmbed()
    .setColor(Color)
    .setDescription(`Reason: ${Reason || 'No reason specified'}`)
    .addField('Member', `${Member.user.tag} (${Member.id})`)
    .addField('Moderator', `${Moderator} (${Moderator.id})`)
    .setTitle(`Action took: ${Action}`)
    .setThumbnail(Member.user.displayAvatarURL())
    channel.send(logsEmbed)
}
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
}); 

console.log('[COMMANDS] => Succesfully loaded commands.')
client.prefix = async function(message) {
    let custom;
    const data = await prefixSchema.findOne({ Guild : message.guild.id })
        .catch(err => console.log(err))
    
if(data) {
    custom = data.Prefix
} else {
    custom = prefix;
}
  return custom;  

}


client.on('ready', () => {
    function presence() {
        let status = ['rex help | rex info', `${client.guilds.cache.size} servers`, `${client.commands.size} commands`] 
        let rstatus = Math.floor(Math.random() * status.length); 
        client.user.setPresence({
            status: "online", 
            activity: {
                name: `${status[rstatus]}`,                type: "WATCHING" 
            }
        });
    }
    
    setInterval(presence, 5000) 



    setInterval(() => {
        mSchema.find().then((data) => {
            if(!data && !data.length) return;

            data.forEach((value) => {
                const guild = client.guilds.cache.get(value.Guild);
                const memberCount = guild.memberCount;

                if(value.Member != memberCount) {
                    const channel = guild.channels.cache.get(value.Channel);
                    channel.setName(`Total Members: ${memberCount}`);

                    value.Member = memberCount;
                    value.save()
                }
            })
        })
    }, ms('15 seconds'))




    blacklist.find()
    .then((data) => {
        data.forEach((val) => {
            blacklistedWords.set(val.Guild, val.Words)
        })
    })


   
    console.log('[SYSTEM] => ONLINE')
    
})




client.on('message', async message =>{
    if(message.author.bot) return;
    const p = await client.prefix(message)
    if (!message.content.startsWith(p)) return;
    blacklist.findOne({ id : message.author.id }, async(err, data) => {
        if(err) throw err;
        if(!data) {
   if(!message.member) message.member = await message.guild.fetchMember(message);
            const args = message.content.slice(p.length).trim().split(/ +/g);
            const cmd = args.shift().toLowerCase();
            if (cmd.length == 0) return;
            const ccdata = await ccSchema.findOne({ Guild: message.guild.id, Command: cmd});
            if(ccdata) message.channel.send(ccdata.Response)
            let command = client.commands.get(cmd)
            if (!command) command = client.commands.get(client.aliases.get(cmd));
            if(!command && !ccdata) return message.channel.send('That command does not exist.')
            if (command) {
                if(!message.member.permissions.has(command.userPermissions || [])) return message.channel.send(`You do not have permission to run that command! \n Missing permission(s): ${command.userPermissions}`)
                if(!message.guild.me.permissions.has(command.botPermissions || [])) return message.channel.send(`I do not have the proper permissions for this command to work! \n Missing permission(s): ${command.botPermissions}`)
                const blacklistedd = await blacklistguild.findOne({ Server: message.guild.id});
                if(blacklistedd) return message.channel.send('It looks like this server has been blacklisted, please contact xalonious#9999 if you think this was a mistake.')
                if(command.timeout) {
                    if(Timeout.has(`${command.name}${message.author.id}`)) return message.channel.send(`You are on a \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), {long: true})}\` cooldown`)
                    
                    Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.timeout)
                    setTimeout(() => {
                        Timeout.delete(`${command.name}${message.author.id}`)
                    }, command.timeout)
                }
                const check = await dbb.findOne({ Guild: message.guild.id })
                if(check) {
                    if(check.Cmds.includes(command.name)) return message.channel.send('This command is currently disabled!')
                    command.run(client, message, args)
                    
                    
                } else {
                    command.run(client, message, args)
                   
                }
            }
        } else {
            message.channel.send('Haha you are blacklisted, sucks to be you nerd.')
        }
    })
})






client.on('message', async(message) => {
    if(!message.guild || message.author.id === client.user.id) return;

    const splittedMsgs = message.content.split(' ')

    let deleting = false;

    await Promise.all(
        splittedMsgs.map((content) => {
            if(blacklistedWords.get(message.guild.id)?.includes(content.toLowerCase())) deleting = true;
        })
    )

    if(deleting) return message.delete()
})


client.on('message', async message=>{
 const botprefix = await client.prefix(message)
if(message.content === `<@!${client.user.id}>`) {
message.channel.send(`My prefix in ${message.guild.name} is ${botprefix} \n Use ${botprefix}help for a list of all of my commands!`)
}
})








client.on('guildMemberAdd', async(guildMember) => {
    await antialt.findOne({ Guild: guildMember.guild.id}, async(err, data) => {
        if(err) throw err;
        if(!data) return;
        const timeSpan = ms('20 days')
        const createdAt = new Date(guildMember.user.createdAt).getTime()
        const difference = Date.now() - createdAt;

        if(difference < timeSpan) {
            guildMember.send(`You were kicked from ${guildMember.guild.name} because you are a possible alt account. Please dm a staff member to verify you are not.`)
            guildMember.kick({ reason: 'possible alt account'})
        }
    })
})







client.on('guildCreate', (guild) => {
    let channelToSend;

    guild.channels.cache.forEach((channel) => {
        if(channel.type === "text" && !channelToSend && channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {

       channelToSend = channel; }
    }
    )
    if(!channelToSend) return;

    channelToSend.send(
        new MessageEmbed()
        .setTitle('Thanks for adding me to your server!')
        .setDescription('Just a few tips to get you started...')
        .setColor('RANDOM')
        .addFields(
            {name: '1.', value: 'My prefix is rex, you can change my prefix by using rex setprefix <prefix>'},
            {name: '2.', value: 'Commands will not work in direct messsages'},
            {name: '3.', value: 'Feel free to visit our website at: https://service-4523.something.gg'},
            {name: '4.', value: 'Make sure I have the proper permissions, otherwise commands might not work.'},
            {name: '5.', value: 'Run the help command for a list of all of my commands.'},
            {name: '6.', value: 'Found any bugs or have feedback? Make sure to use the feedback command.'}
        )
        .setFooter('Thanks again for adding me, I hope you like me! ;D')
        .setThumbnail(client.user.displayAvatarURL())
    )
});








client.on('guildDelete', async (guild) => {
    prefixSchema.findOne({ Guild: guild.id }, async (err, data) => {
        if (err) throw err;
        if (data) {
            prefixSchema.findOneAndDelete({ Guild : guild.id }).then(console.log('deleted data.'))
        }
    })
})






// guildMemberAdd event
const WelcomeSchema = require('./models/WelcomeSchema');


client.on('guildMemberAdd', async(member) => {
  if(member.user.bot) return;
    

    const background = 'https://img.freepik.com/free-vector/blue-copy-space-digital-background_23-2148821698.jpg?size=626&ext=jpg&ga=GA1.2.922892222.1621641600'
   

  

    await WelcomeSchema.findOne({ Guild: member.guild.id }, async (err, data) => {

        if (err) {
            console.log(`[ERROR] => ${err}`)
        }

        if (data) {

            const channel = member.guild.channels.cache.get(data.Channel)

            if (!channel) {
                return
            }

            const msgType = data.MessageType

            if (msgType === "embed") {

              
              
                const text = data.Message

                const embed = new MessageEmbed()
                    .setAuthor(member.user.username, member.user.displayAvatarURL())
                    .setDescription(text.replace(`{member}`, `${member}`).replace(`{member:tag}`, `${member.user.tag}`).replace(`{guild:name}`, `${member.guild.name}`).replace(`{guild:memberCount}`, `${member.guild.memberCount}`))
                    .setColor("#a9dcfd")
                    .setThumbnail(member.guild.iconURL())

                return channel.send(embed)
            }

            else if (msgType === "image") {

                const text = data.Message

                const image = await new canvas.Welcome()
                    .setUsername(member.user.username)
                    .setDiscriminator(member.user.discriminator)
                    .setMemberCount(member.guild.memberCount)
                    .setGuildName(member.guild.name)
                    .setAvatar(member.user.displayAvatarURL({ format: 'png' }))
                    .setColor("border", "#8015EA")
                    .setColor("username-box", "#8015EA")
                    .setColor("discriminator-box", "#8015EA")
                    .setColor("message-box", "#8015EA")
                    .setColor("title", "#8015EA")
                    .setColor("avatar", "#8015EA")
                    .setBackground(background)
                    .toAttachment();

                const attachment = new MessageAttachment(image.toBuffer(), "welcome-image.png");

                channel.send(text.replace(`{member}`, `${member}`).replace(`{member:tag}`, `${member.user.tag}`).replace(`{guild:name}`, `${member.guild.name}`).replace(`{guild:memberCount}`, `${member.guild.memberCount}`), attachment);

            }

            else if (msgType === "default") {

                const text = data.Message

                channel.send(text.replace(`{member}`, `${member}`).replace(`{member:tag}`, `${member.user.tag}`).replace(`{guild:name}`, `${member.guild.name}`).replace(`{guild:memberCount}`, `${member.guild.memberCount}`), `${member.user.tag}`)
            }
        }
    })
})



client.on('messageReactionAdd', async(reaction, user) => {
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();
    if(user.bot) return;

    reactSchema.findOne({ Message: reaction.message.id }, async(err, data) => {
        if(!data) return;
        if(!Object.keys(data.Roles).includes(reaction.emoji.name)) return;

        const [ roleid ] = data.Roles[reaction.emoji.name];
        reaction.message.guild.members.cache.get(user.id).roles.add(roleid)
        user.send('You have obtained a role.')
    })
})
    



    client.on('messageReactionRemove', async(reaction, user) => {
        if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();
    if(user.bot) return;

    reactSchema.findOne({ Message: reaction.message.id }, async(err, data) => {
        if(!data) return;
        if(!Object.keys(data.Roles).includes(reaction.emoji.name)) return;

        const [ roleid ] = data.Roles[reaction.emoji.name];
        reaction.message.guild.members.cache.get(user.id).roles.remove(roleid)
        user.send('You have lost a role.')
    })
    })
    
    client.on('channelDelete', async(deletedChannel) => {
        await mSchema.findOne({ Guild: deletedChannel.guild.id, Channel: deletedChannel.id }, async(err, data) => {
        if(err) throw err;
        
        if(data) {
        await mSchema.findOneAndDelete({ Guild: deletedChannel.guild.id })
        console.log(`Deleted data for guild "${deletedChannel.guild.name}"`)
        }
        })
        })


        





        player.on("playSong", (message, queue, song) => message.channel.send(
            `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`
        ))

        player.on("addSong", (message, queue, song) => message.channel.send(
            `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
        ))


player.on("initQueue", queue => {
    queue.autoplay = false;
    queue.volume = 100;
});


        client.player = player;



        client.on("messageDelete", (message) => {
            client.snipes.set(message.channel.id, {
                content: message.content,
                author: message.author.tag,
                member: message.member,
                image: message.attachments.first() ? message.attachments.first().proxyURL : null
            })
        })

        const snipes = new Discord.Collection();

client.on("messageDelete", async message => {
   snipes.set(message.channel.id, message)
   const dataaa = await modlogsSchema.findOne({ Guild: message.guild.id });
    if(!dataaa) return;
   const logChannel = message.guild.channels.cache.get(dataaa.Channel)
   let deletedContent = new Discord.MessageEmbed()
   .setTitle("Deleted Message")
   .addField("Deleted by:", `${message.author} - (${message.author.id})`)
   .addField("In:", message.channel)
   .addField("Content", message.content)
   .setColor("RANDOM")
   .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
   logChannel.send(deletedContent);
});





client.on('guildMemberAdd', async(member) => {
    const checkk = await db.has(`autorole-${member.guild.id}`)
    if(checkk === true) {
        member.roles.add(await db.get(`autorole-${member.guild.id}`))
    }
})


      











client.login(token)
   
