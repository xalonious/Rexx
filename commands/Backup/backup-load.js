backup = require('discord-backup')
module.exports = {
    name: 'backup-load',
    description: 'loads a backup',
    usage: '<backupid>',
    userPermissions: ['ADMINISTRATOR'],
    botPermissions: ['MANAGE_ROLES', 'MANAGE_CHANNELS', 'MANAGE_WEBHOOKS'],

    run : async(client, message, args) => {
       
        
        let backupID = args[0];
        if(!backupID){
            return message.channel.send(":x: | You must specify a valid backup ID!");
        }
        // Fetching the backup to know if it exists
        backup.fetch(backupID).then(async () => {
            // If the backup exists, request for confirmation
            message.channel.send(":warning: WARNING | When the backup is loaded, all the channels, roles, etc. will be replaced! Type `-confirm` to confirm, or anything else to cancel.");
                await message.channel.awaitMessages(m => (m.author.id === message.author.id) && (m.content === "-confirm"), {
                    max: 1,
                    time: 20000,
                    errors: ["time"]
                }).catch((err) => {
                    // if the author of the commands does not confirm the backup loading
                    return message.channel.send(":x: | Cancelled backup loading!");
                });
                // When the author of the command has confirmed that he wants to load the backup on his server
                message.author.send(":white_check_mark: | Loading backup...");
                // Load the backup
                backup.load(backupID, message.guild).then(() => {
                    // When the backup is loaded, delete them from the server
                    backup.remove(backupID);
                    message.author.send(":white_check_mark: | Backup loaded succesfully.")
                }).catch((err) => {
                    // If an error occurred
                });
        }).catch((err) => {
            console.log(err);
            // if the backup wasn't found
            return message.channel.send(":x: | No backup found for `"+backupID+"`!");
        });
    }
    }