const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class CezalarKanalıAyarlaCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'cezalar-kanalı-ayarla',
            aliases: ['cezalar-kanal', 'cezalar-kanalı', 'cezalar-kanal-ayarla', 'ceza-kanal', 'ceza-kanalı', 'ceza-kanal-ayarla'],
            group: 'sunucu',
            memberName: 'cezalar-kanalı-ayarla',
            description: 'Cezaların Gönderileceği Kanalı Ayarlamanızı Sağlar.',
            guildOnly: true,
            userPermissions: ['ADMINISTRATOR'],
            args: [
                {
                    key: 'kanal_kapat',
                    prompt: 'Cezalar kanalı olarak kullanılmasını istediğiniz kanalı etiketleyin.',
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
    msg.guild.settings.remove('CezalarKanalı');

    let embed = new MessageEmbed()
      .setColor('0x36393F')
      .setDescription('<:dogru:506200517249204239> Cezalar sistemi kapatıldı.')
      .setTimestamp()
    return msg.channel.send(embed)
  }

  msg.guild.settings.set('CezalarKanalı', args.kanal_kapat.id);

  let embed = new MessageEmbed()
    .setColor('0x36393F')
    .setDescription('<:dogru:506200517249204239> Cezalar kanalı <#' + args.kanal_kapat.id + '> olarak ayarlandı.')
    .setTimestamp()
  return msg.channel.send(embed)
}
}