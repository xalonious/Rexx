const { Calculator } = require('weky')
module.exports = {
    name: 'calculator',
    aliases : ['calc'],
    description: 'use me as a calculator!',
    timeout: 20000,

    run : async(client, message, args) => {
        await Calculator(message)
    }
}