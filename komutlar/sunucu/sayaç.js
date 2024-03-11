const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class SayaçCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'sayaç',
            aliases: ['sayaç-ayarla'],
            group: 'sunucu',
            memberName: 'sayaç',
            description: 'Sayacı Ayarlamanızı Sağlar.',
            guildOnly: true,
            userPermissions: ['ADMINISTRATOR'],
            args: [
                {
                    key: 'sayı',
                    prompt: 'Sayacın hedeflemesini istediğiniz kullanıcı sayısını yazın.',
                    type: 'integer'
                }
            ]
        });
    }

async run(msg, args) {

  let SayaçKanalı = msg.guild.settings.get('SayaçKanalı');
  if (!SayaçKanalı) return msg.reply('Sayaç kanalı ayarlanmadığından sayaç sistemi devre dışıdır. Sayaç kanalını ayarlamak için `' + msg.guild.commandPrefix + 'sayaç-kanal-ayarla` komutunu kullanabilirsiniz.');

  if (Number(args.sayı <= msg.guild.memberCount)) return msg.reply('Sayaç hedefi Sunucudaki Kullanıcı Sayısından (**' + msg.guild.memberCount + '**) Yüksek Olmalı.')

  msg.guild.settings.set('Sayaç', args.sayı);

  let embed = new MessageEmbed()
    .setColor('0x36393F')
    .setDescription('<:dogru:506200517249204239> Sayacın hedefi ' + args.sayı + ' olarak ayarlandı.')
    .setTimestamp()
  return msg.channel.send(embed)
}
}