const koenie06games = require('koenie06-games')
const FastTyper = new koenie06games.FastTyper()

module.exports = {
    name: 'fasttype',
    description: 'play a fast type game',

    run : async(client, message, args) => {
        FastTyper.newGame(message)
    }
}