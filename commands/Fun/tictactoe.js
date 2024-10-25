module.exports = {
    name: 'tictactoe',
    aliases : ['ttt'],
    description: 'play tictactoe with someone!',
    usage: '<user>',
    timeout: 10000,

    run : async(client, message, args) => {
const opponent = message.mentions.users.first();
if (!opponent) return message.channel.send(`Please mention who you want to challenge at tictactoe.`);
const { TicTacToe } = require('weky')
const game = new TicTacToe({
    message: message,
    opponent: opponent, 
    xColor: 'red', 
    oColor: 'blurple', 
    xEmoji: '❌',  
    oEmoji: '0️⃣' ,
})
game.start()

    }
}