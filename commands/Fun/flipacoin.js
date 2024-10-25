module.exports = {
    name: 'flipacoin',
    aliases : ['coinflip'],
    description: 'flips a coin',
    run : async(client, message, args) => {
        let number = Math.floor(Math.random() * 2);
        if (number == 1) {
            message.channel.send(':coin: Heads')
        }
        if (number == 0) {
            message.channel.send(':coin: Tails')
        }
    }
};