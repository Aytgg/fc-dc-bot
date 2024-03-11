const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class OtoRolAyarlaCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'oto-rol',
            aliases: ['auto-role', 'oto-rol-ayarla', 'set-auto-role'],
            group: 'sunucu',
            memberName: 'oto-rol',
            description: 'Sunucuya Yeni Gelenlerin Otomatik Olarak Alacağı Rolü Ayarlamanızı Sağlar.',
            guildOnly: true,
            userPermissions: ['ADMINISTRATOR'],
            args: [
              {
                  key: 'rol_kapat',
                  prompt: 'Otorol olarak kullanılmasını istediğiniz rolü etiketleyin.',
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
    msg.guild.settings.remove('OtoRol');

    let embed = new MessageEmbed()
      .setColor('0x36393F')
      .setDescription('<:dogru:506200517249204239> Otorol kapatıldı.')
      .setTimestamp()
    return msg.channel.send(embed)
  }

  msg.guild.settings.set('OtoRol', args.rol_kapat.id);

  let embed = new MessageEmbed()
    .setColor('0x36393F')
    .setDescription('<:dogru:506200517249204239> Otorol <@&' + args.rol_kapat.id + '> olarak ayarlandı.')
    .setTimestamp()
  return msg.channel.send(embed)
}
}