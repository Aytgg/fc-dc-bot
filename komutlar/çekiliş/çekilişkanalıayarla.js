const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class ÇekilişKanalıAyarlaCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'çekiliş-kanalı-ayarla',
            aliases: ['çekiliş-kanal', 'çekiliş-kanalı', 'çekiliş-kanal-ayarla'],
            group: 'çekiliş',
            memberName: 'çekiliş-kanalı-ayarla',
            description: 'Çekilişlerin Yapacağı Kanalı Ayarlamanızı Sağlar.',
            guildOnly: true,
            userPermissions: ['ADMINISTRATOR'],
            args: [
                {
                    key: 'kanal_kapat',
                    prompt: 'Çekiliş kanalı olarak kullanılmasını istediğiniz kanalı etiketleyin.',
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
    msg.guild.settings.remove('ÇekilişKanalı');

    let embed = new MessageEmbed()
      .setColor('0x36393F')
      .setDescription('<:dogru:506200517249204239> Çekiliş sistemi kapatıldı.')
      .setTimestamp()
    return msg.channel.send(embed)
  }

  msg.guild.settings.set('ÇekilişKanalı', args.kanal_kapat.id);

  let embed = new MessageEmbed()
    .setColor('0x36393F')
    .setDescription('<:dogru:506200517249204239> Çekiliş kanalı <#' + args.kanal_kapat.id + '> olarak ayarlandı.')
    .setTimestamp()
  return msg.channel.send(embed)
}
}