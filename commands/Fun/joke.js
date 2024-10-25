const giveMeAJoke = require('discord-jokes');
module.exports = {
    name: 'joke',
    description: 'gives you a random joke',
    run : async(client, message, args) => {
        giveMeAJoke.getRandomDadJoke (function(joke) {
            message.channel.send(joke);
        })
    }
}