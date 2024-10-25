const fetch = require("node-fetch");
const Discord = require("discord.js");


module.exports = {
    name: 'covidstats',
    description: 'Gives the covid stats for a country or worldwide',
    usage: '<country/all>',


  run : async(client, message, args) => {  
    let countries = args.join(" ");
    const noArgs = new Discord.MessageEmbed()
      .setTitle("Error: Missing arguments")
      .setColor("RED")
      .setDescription('Invalid input, use rex covidstats <country> to get the stats for a specific country.')
      .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')


      const invArgs = new Discord.MessageEmbed()
      .setTitle("Error: Invalid arguments")
      .setColor("RED")
      .setDescription('The country you provided is invalid.')
      .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/cross-emoji-png-2-Transparent-Images.png')

    
    if (!args[0]) return message.channel.send(noArgs);

    if (args[0] === "all") {
      fetch(`https://covid19.mathdro.id/api`)
        .then(response => response.json())
        .then(data => {
          let confirmed = data.confirmed.value.toLocaleString();
          let recovered = data.recovered.value.toLocaleString();
          let deaths = data.deaths.value.toLocaleString();

          const embed = new Discord.MessageEmbed()
            .setTitle(`Worldwide COVID-19 Stats 🌎`)
            .addField("Confirmed Cases", confirmed)
            .addField("Recovered", recovered)
            .addField("Deaths", deaths)
            .setColor('BLUE')

          message.channel.send(embed);
        });
    } else {
      fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
        .then(response => response.json())
        .then(data => {
          let confirmed = data.confirmed.value.toLocaleString();
          let recovered = data.recovered.value.toLocaleString();
          let deaths = data.deaths.value.toLocaleString();

          const embed = new Discord.MessageEmbed()
            .setTitle(`COVID-19 Stats for **${countries}**`)
            .addField("Confirmed Cases", confirmed)
            .addField("Recovered", recovered)
            .addField("Deaths", deaths)
            .setColor('BLUE')

          message.channel.send(embed);
        })
        .catch(e => {
          return message.channel.send(invArgs)
        });
    }
  }
};
