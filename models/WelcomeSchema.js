const mongoose = require('mongoose')

const WelcomeSchema = new mongoose.Schema({
    Guild: String,
    Channel: String,
    Message: String,
    MessageType: String
})

module.exports = mongoose.model("WelcomeSchema", WelcomeSchema)