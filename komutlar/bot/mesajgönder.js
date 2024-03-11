const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class YardımCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'mesajgönder',
            aliases: ['dmgönder', 'dmtouser', 'dmuser'],
            group: 'bot',
            memberName: 'mesajgönder',
            description: 'İstenilen Mesajı Bahsedilen Kişiye DM Olarak Gönderir.',
            args: [
                {
                    key: 'kullanıcı',
                    prompt: 'Mesaj göndermek istediğiniz kişiyi etiketleyin.',
                    type: 'user'
                },
                {
                    key: 'mesaj',
                    prompt: 'Göndermek istediğiniz mesajı yazın.',
                    type: 'string',
                }
            ]
        });
    }

hasPermission(msg) {
    return this.client.isOwner(msg.author);
}

async run(msg, args) {

  msg.delete();

  try {
    args.kullanıcı.send(args.mesaj);

    msg.channel.send('Mesaj gönderildi.').then(m => m.delete(3000))
  } catch(e) {
    return
  }
}
}