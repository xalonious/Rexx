const { oldReconDB } = require('reconlx')
const config = require('./config.json')

const db = new oldReconDB({
    uri: config.mongodbstring
})

module.exports = db;