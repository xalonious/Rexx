const koenie06games = require('koenie06-games')
const ConnectFour = new koenie06games.ConnectFour()

module.exports = {
    name: 'connect4',
    description: 'play connect 4',
    usage: '<user>',

    run : async(client, message, args) => {
        ConnectFour.newGame(message)
    }
}