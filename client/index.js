const client = require('../index')
const { GiveawayClient } = require('reconlx')
const config = require("../config.json")

const giveaway = new GiveawayClient(client, {
    mongoURI: config.mongodbstring,
    emoji: '🎉',
    defaultColor: "2EFEC8"
});

module.exports = giveaway;