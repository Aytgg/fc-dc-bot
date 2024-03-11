const { Command } = require('discord.js-commando');
const { WebhookClient } = require('discord.js');

module.exports = class SahteYazCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'sahteyaz',
            aliases: ['fakemesaj', 'fakeyaz', 'fakemsg', 'sahtemesaj', 'sahtemsg'],
            group: 'eğlence',
            memberName: 'sahteyaz',
            description: 'Etiketlenen Kişiye Sahte Mesaj Yazdırır.',
            args: [
              {
                    key: 'kullanıcı',
                    prompt: 'Sahte mesajı yazacak kişiyi seçin.',
                    type: 'member'
              },
              {
                    key: 'mesaj',
                    prompt: 'Yazdırmak istediğiniz sahte mesajı yazın.',
                    type: 'string'
              }
            ]
        });
    }

async run(msg, args) {

  msg.delete();
  msg.channel.createWebhook(args.kullanıcı.displayName, { avatar: args.kullanıcı.user.displayAvatarURL({ format: 'png' }), reason: 'Sahte Yaz Komutu ~Fairy Canary' })
  .then(webhook => webhook.edit(args.kullanıcı.displayName, { avatar: args.kullanıcı.user.displayAvatarURL({ format: 'png' }), reason: 'Sahte Yaz Komutu ~Fairy Canary' })
      .then(wb => {
          const hook = new WebhookClient(wb.id, wb.token);
          hook.send(args.mesaj);
          setTimeout(async() => {
            hook.delete();
          }, 1000);
      })
  .catch(console.error))
  .catch(console.error);
}
}