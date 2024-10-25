const { WouldYouRather } = require('weky')


module.exports = {
    name: 'wouldyourather',
    aliases : ['wyr'],
    description: 'play would you rather!',

    run : async(client, message , args) => {
        await WouldYouRather(message)
    }
}