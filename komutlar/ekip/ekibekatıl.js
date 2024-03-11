const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class EkibeKatılCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ekibe-katıl',
            aliases: ['ekip'],
            group: 'ekip',
            memberName: 'ekibekatıl',
            description: 'Ekip Rolünü Almanızı Sağlar.',
            guildOnly: true,
        });
    }

async run(msg, args) {

  let ekipRolüID = msg.guild.settings.get('EkipRolü');
  if (!ekipRolüID) return msg.reply(':negative_squared_cross_mark: Ekip sistemini kullanabilmek için öncelikle ekip rolü ayarlanmış olmalı.');
  let ekipRolü = msg.guild.roles.get(ekipRolüID);

  let ekipTagı = msg.guild.settings.get('EkipTagı');
  if (!ekipTagı) return msg.reply(':negative_squared_cross_mark: Ekip sistemini kullanabilmek için öncelikle ekip tagı ayarlanmış olmalı.');

  if (!msg.author.username.includes(ekipTagı)) return msg.channel.send(':negative_squared_cross_mark: Ekibe Katılabilmek İçin Kullanıcı Adına **' + ekipTagı + '** Eklemelisin !');
  if (msg.member.roles.some(r=>[ekipRolüID].includes(r.id))) return msg.channel.send(":negative_squared_cross_mark: Zaten Ekiptesin !");

  msg.member.roles.add(ekipRolü);
  msg.member.setNickname(ekipTagı + ' ' + msg.member.displayName);

  let embed = new MessageEmbed()
    .setColor('0x36393F')
    .setTitle(msg.guild.name)
    .setDescription('Ekibe Katıldınız. Sunucudaki kullanıcı adınız ' + msg.member.displayName + ' olarak değiştirildi.')
  msg.author.send(embed)

  let embed1 = new MessageEmbed()
    .setColor('0x36393F')
    .setDescription('Ekibe Katıldınız.')
  msg.channel.send(embed1)
}
}