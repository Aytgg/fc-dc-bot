const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class SayaçKanalıAyarlaCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'sayaç-kanalı-ayarla',
            aliases: ['sayaç-kanal', 'sayaç-kanalı', 'sayaç-kanal-ayarla'],
            group: 'sunucu',
            memberName: 'sayaç-kanalı-ayarla',
            description: 'Sayacın Çalışacağı Kanalı Ayarlamanızı Sağlar.',
            guildOnly: true,
            userPermissions: ['ADMINISTRATOR'],
            args: [
                {
                    key: 'kanal_kapat',
                    prompt: 'Sayaç kanalı olarak kullanılmasını istediğiniz kanalı etiketleyin.',
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
    msg.guild.settings.remove('SayaçKanalı');
    msg.guild.settings.remove('Sayaç');

    let embed = new MessageEmbed()
      .setColor('0x36393F')
      .setDescription('<:dogru:506200517249204239> Sayaç sistemi kapatıldı.')
      .setTimestamp()
    return msg.channel.send(embed)
  }

  msg.guild.settings.set('SayaçKanalı', args.kanal_kapat.id);

  let embed = new MessageEmbed()
    .setColor('0x36393F')
    .setDescription('<:dogru:506200517249204239> Sayaç kanalı <#' + args.kanal_kapat.id + '> olarak ayarlandı.')
    .setTimestamp()
  return msg.channel.send(embed)
}
}