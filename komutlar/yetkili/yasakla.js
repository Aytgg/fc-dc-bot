const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class YasaklaCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'yasakla',
            aliases: ['ban'],
            group: 'yetkili',
            memberName: 'yasakla',
            description: 'Seçilen Kullanıcıyı Sunucudan Yasaklar.',
            guildOnly: true,
            userPermissions: ['BAN_MEMBERS'],
            args: [
                {
                    key: 'kullanıcı',
                    prompt: 'Sunucudan yasaklanacak kullanıcıyı etiketleyin.',
                    type: 'member|string',
                    validate: (value, msg, arg) => {
                      if (value.length  == '18') return true;

                      return this.client.registry.types.get('member').validate(value, msg, arg);
                    }
                },
                {
                    key: 'sebep',
                    prompt: 'Kullanıcının yasaklanma sebebini yazın.',
                    type: 'string'
                }
            ]
        });
    }

async run(msg, args) {

  let ModLogKanalı = msg.guild.channels.get(msg.guild.settings.get('ModLogKanalı'));
  let CezalarKanalı = msg.guild.channels.get(msg.guild.settings.get('CezalarKanalı'));

  if (args.kullanıcı.length == '18') args.kullanıcı = msg.guild.members.get(args.kullanıcı);

  let embed = new MessageEmbed()
    .setAuthor('Kulanıcı Yasaklandı')
    .setColor('#fc6400')
    .addField('Yetkili', msg.author.tag)
    .addField('Yasaklanan', '<@$' +args.kullanıcı.id + '>')
    .addField('Sebep', args.sebep)
    .setTimestamp()
  if (ModLogKanalı) {
    ModLogKanalı.send(embed);
    msg.channel.send('<:dogru:506200517249204239> ***<@' + args.kullanıcı.id + '> Yasaklandı***');
  }
  else msg.channel.send(embed)

  let embed1 = new MessageEmbed()
    .setAuthor('Sunucudan Yasaklandın')
    .setColor('#fc6400')
    .addField('Yetkili', '<@$' + msg.author.id + '>')
    .addField('Sunucu', msg.guild.name)
    .addField('Sebep', args.sebep)
    .setTimestamp()
  args.kullanıcı.send(embed1);
  if (CezalarKanalı) CezalarKanalı.send('<@' + args.kullanıcı.id + '> Atıldı. Sebep: **' + args.sebep + '**')

  args.kullanıcı.ban(args.sebep);
}
}