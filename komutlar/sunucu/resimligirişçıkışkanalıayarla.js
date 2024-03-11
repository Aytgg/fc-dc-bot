const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class ResimliGirişÇıkışKanalıAyarlaCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'resimli-giriş-çıkış-kanalı-ayarla',
            aliases: ['resimli-giriş-çıkış-kanal', 'resimli-giriş-çıkış-kanalı', 'resimli-giriş-çıkış-kanal-ayarla'],
            group: 'sunucu',
            memberName: 'resimli-giriş-çıkış-kanalı-ayarla',
            description: 'Resimli Giriş Çıkışların Gönderileceği Kanalı Ayarlamanızı Sağlar.',
            guildOnly: true,
            userPermissions: ['ADMINISTRATOR'],
            args: [
                {
                    key: 'kanal_kapat',
                    prompt: 'Resimli giriş çıkış kanalı olarak kullanılmasını istediğiniz kanalı etiketleyin.',
                    type: 'channel|string',
                    validate: (value, msg, arg) => {
                      let lc = value.toLowerCase()
                      if (lc == 'kapat' || lc == 'kapa' || lc == 'close' || lc == 'disable') return true;

                      return this.client.registry.types.get('channel').validate(value, msg, arg);
                    }
                }
            ]
        });
    }

async run(msg, args) {

  if (args.kanal_kapat == 'kapat' || args.kanal_kapat == 'kapa' || args.kanal_kapat == 'close' || args.kanal_kapat == 'disable')
  {
    msg.guild.settings.remove('ResimliGirişÇıkışKanalı');
    msg.guild.settings.remove('ResimliGiriş');
    msg.guild.settings.remove('ResimliÇıkış');

    let embed = new MessageEmbed()
      .setColor('0x36393F')
      .setDescription('<:dogru:506200517249204239> Resimli giriş çıkış sistemi kapatıldı.')
      .setTimestamp()
    return msg.channel.send(embed)
  }

  msg.guild.settings.set('ResimliGirişÇıkışKanalı', args.kanal_kapat.id);

  let embed = new MessageEmbed()
    .setColor('0x36393F')
    .setDescription('<:dogru:506200517249204239> Resimli giriş çıkış kanalı <#' + args.kanal_kapat.id + '> olarak ayarlandı.')
    .setTimestamp()
  return msg.channel.send(embed)
}
}