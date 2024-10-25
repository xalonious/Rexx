const { MessageEmbed, Util } = require('discord.js')
const YouTube = require("youtube-sr").default; 

module.exports = {
    name: 'youtube',
    aliases : ['youtube-search', 'yt-search'],
    description: 'Search For Videos On YouTube ', 
    usage: '[channel] <video>',

    run: async(client, message, args) => {

        const video = args.join(' ') 
        if(!video) return message.reply(`Which Video Do You Want To Search For?`) 

        function getVideo(title, url, duration, thumbnail, views, uploadedAt, description) { 
            const reslut = {
                "title": title, 
                "url": url, 
                "duration": duration, 
                "thumbnail": thumbnail, 
                "views": views,
                "description": description, 
                "uploadedAt": uploadedAt 
            }
            return reslut
        }

        let videoInfo = await YouTube.searchOne(video) 
        if(!videoInfo) return message.reply(`No Video Found With **${video}**`) 

        videodetail = getVideo(Util.escapeMarkdown(videoInfo.title), videoInfo.url, videoInfo.durationFormatted, videoInfo.thumbnail.url, videoInfo.uploadedAt, videoInfo.views, videoInfo.description) 

        const embed = new MessageEmbed()
        .setTitle(videodetail.title)
        .setURL(videoInfo.url)
        .setTimestamp()
        .setThumbnail(videodetail.thumbnail)
        .setColor('RANDOM')
        .setDescription(`
Duration: ${videodetail.duration}
Views: ${videodetail.uploadedAt}
Uploaded: ${videodetail.views}
        `)
        .setFooter(`Video Requested By ${message.author.username}`)
        message.channel.send(embed)
    }
}