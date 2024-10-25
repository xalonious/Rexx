const Discord = require("discord.js");
const weather = require("weather-js");

module.exports = {
    name: 'weather',
    description: 'gives you the weather for a specific place',
    usage: '<place>',
    run : async(client, message, args) => {
    let city = args.join(" ");
    let degreetype = "C"; 

    await weather.find({search: city, degreeType: degreetype}, function(err, result) {

        const noargs = new Discord.MessageEmbed()
        .setTitle('Error: Missing Arguments')
        .setDescription('You did not specify a city')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')

        if (!city) return message.channel.send(noargs)

        const notfound = new Discord.MessageEmbed()
        .setTitle('Error: Invalid Arguments')
        .setDescription('I could not find that city.')
        .setColor('RED')
        .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')


        if (err || result === undefined || result.length === 0) return message.channel.send(notfound)

        let current = result[0].current;
        let location = result[0].location;

        const embed = new Discord.MessageEmbed()
        .setAuthor(current.observationpoint)
        .setDescription(`> ${current.skytext}`)
        .setThumbnail(current.imageUrl)
        .setTimestamp()
        .setColor(0x7289DA)

        embed.addField("Latitude", location.lat, true)
        .addField("Longitude", location.long, true)
        .addField("Feels Like", `${current.feelslike}° Degrees`, true)
        .addField("Degree Type", location.degreetype, true)
        .addField("Winds", current.winddisplay, true)
        .addField("Humidity", `${current.humidity}%`, true)
        .addField("Timezone", `GMT ${location.timezone}`, true)
        .addField("Temperature", `${current.temperature}° Degrees`, true)
        .addField("Observation Time", current.observationtime, true)

        return message.channel.send(embed);
    })
}}