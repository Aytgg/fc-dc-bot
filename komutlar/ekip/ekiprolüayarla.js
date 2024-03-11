const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class EkipRolüAyarlaCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ekip-rolü-ayarla',
            aliases: ['ekip-rolü'],
            group: 'ekip',
            memberName: 'ekip-rolü-ayarla',
            description: 'Sunucudaki Ekip Rolünü Seçmenizi Sağlar.',
            guildOnly: true,
            userPermissions: ['ADMINISTRATOR'],
            args: [
              {
                  key: 'rol_kapat',
                  prompt: 'Ekip rolü olarak kullanılmasını istediğiniz rolü etiketleyin.',
                  type: 'role|string',
                  validate: (value, msg, arg) => {
                    let lc = value.toLowerCase()
                    if (lc == 'kapat' || lc == 'kapa' || lc == 'close' || lc == 'disable') return true;

                    return this.client.registry.types.get('role').validate(value, msg, arg);
                  }
              }
            ]
        });
    }

async run(msg, args) {

  if (args.rol_kapat == 'kapat' || args.rol_kapat == 'kapa' || args.rol_kapat == 'close' || args.rol_kapat == 'disable')
  {
    msg.guild.settings.remove('EkipRolü');

    let embed = new MessageEmbed()
      .setColor('0x36393F')
      .setDescription('<:dogru:506200517249204239> Ekip rolü kaldırıldı.')
      .setTimestamp()
    return msg.channel.send(embed)
  }

  msg.guild.settings.set('EkipRolü', args.rol_kapat.id);

  let embed = new MessageEmbed()
    .setColor('0x36393F')
    .setDescription('<:dogru:506200517249204239> Ekip rolü <@&' + args.rol_kapat.id + '> olarak ayarlandı.')
    .setTimestamp()
  return msg.channel.send(embed)
}
}