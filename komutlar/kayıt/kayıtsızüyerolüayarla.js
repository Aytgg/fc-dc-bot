const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class KayıtsızÜyeRolüAyarlaCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kayıtsız-üye-rolü-ayarla',
            aliases: ['kayıtsız-üye-rolü', 'kayıtsız-rolü-ayarla', 'kayıtsız-rolü'],
            group: 'kayıt',
            memberName: 'kayıtsız-üye-rolü-ayarla',
            description: 'Sunucudaki Kayıtsız Üye Rolünü Seçmenizi Sağlar.',
            guildOnly: true,
            userPermissions: ['ADMINISTRATOR'],
            args: [
              {
                  key: 'rol_kapat',
                  prompt: 'Kayıtsız üye rolü olarak kullanılmasını istediğiniz rolü etiketleyin.',
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
    msg.guild.settings.remove('KayıtsızÜyeRolü');

    let embed = new MessageEmbed()
      .setColor('0x36393F')
      .setDescription('<:dogru:506200517249204239> Kayıtsız üye rolü kaldırıldı.')
      .setTimestamp()
    return msg.channel.send(embed)
  }

  msg.guild.settings.set('KayıtsızÜyeRolü', args.rol_kapat.id);

  let embed = new MessageEmbed()
    .setColor('0x36393F')
    .setDescription('<:dogru:506200517249204239> Kayıtsız üye rolü <@&' + args.rol_kapat.id + '> olarak ayarlandı.')
    .setTimestamp()
  return msg.channel.send(embed)
}
}