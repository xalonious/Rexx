const { Schema, model } = require('mongoose')

module.exports = new model('member-count', new Schema({
    Guild: String,
    Channel: String,
    Member: String,
}))