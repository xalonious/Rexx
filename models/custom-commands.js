const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    Guild: String,
    Command: String,
    Response: String,
})

module.exports = new mongoose.model('custom-commands', Schema)