const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class UyarısilCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'mesajsil',
            aliases: ['temizle', 'sil', 'purge', 'clear', 'mesajtemizle'],
            group: 'altyetkili',
            memberName: 'mesajsil',
            description: 'Belirlenen Miktardaki Mesajı Siler.',
            guildOnly: true,
            userPermissions: ['MANAGE_MESSAGES'],
            args: [
                {
                    key: 'miktar',
                    prompt: 'Silinecek mesaj miktarını yazın',
                    type: 'integer',
                    validate: (value, msg, arg) => {
                      if (value <= 99) return true
                    }
                }
            ]
        });
    }

async run(msg, args) {

  msg.delete()

  msg.channel.bulkDelete(args.miktar + 1);
  msg.channel.send(':white_check_mark: '+ args.miktar +' mesaj başarıyla silindi.')
    .then(m => m.delete(3000))
}
}