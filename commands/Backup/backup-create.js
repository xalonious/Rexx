const settings = require('../../config.json')
backup = require('discord-backup')
module.exports = {
    name: 'backup-create',
    description: 'creates a backup',
    userPermissions: ['ADMINISTRATOR'],

    run : async(client, message, args) => {
      message.channel.send('Creating backup, this may take a little depending on the size of your server')
       
        // Create the backup
        backup.create(message.guild, {
            jsonBeautify: true
        }).then((backupData) => {
            // And send informations to the backup owner
            message.author.send("The backup has been created! To load it, type this command on the server of your choice: `"+settings.prefix+"backup-load "+backupData.id+"`!");
            message.channel.send(":white_check_mark: Backup successfully created. The backup ID was sent in dm!");
        })}}