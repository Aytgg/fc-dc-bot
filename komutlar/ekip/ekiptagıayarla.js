const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class EkipTagıAyarlaCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ekip-tagı-ayarla',
            aliases: ['ekip-tagı', 'ekip-tag'],
            group: 'ekip',
            memberName: 'ekip-tagı-ayarla',
            description: 'Sunucudaki Ekip Tagını Seçmenizi Sağlar.',
            guildOnly: true,
            userPermissions: ['ADMINISTRATOR'],
            args: [
              {
                  key: 'tag',
                  prompt: 'Ekip tagı olarak kullanılmasını istediğiniz tagı yazınız.',
                  type: 'string'
              }
            ]
        });
    }

async run(msg, args) {

  if (args.tag == 'kapat' || args.tag == 'kapa' || args.tag == 'close' || args.tag == 'disable')
  {
    msg.guild.settings.remove('EkipTagı');

    let embed = new MessageEmbed()
      .setColor('0x36393F')
      .setDescription('<:dogru:506200517249204239> Ekip tagı kaldırıldı.')
      .setTimestamp()
    return msg.channel.send(embed)
  }

  msg.guild.settings.set('EkipTagı', args.tag);

  let embed = new MessageEmbed()
    .setColor('0x36393F')
    .setDescription('<:dogru:506200517249204239> Ekip tagı **' + args.tag + '** olarak ayarlandı.')
    .setTimestamp()
  return msg.channel.send(embed)
}
}