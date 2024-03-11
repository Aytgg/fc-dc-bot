const { MessageEmbed } = require('discord.js');

const moment = require('moment');

module.exports = async (member) => {
  let ModLogKanalı = member.guild.channels.cache.get(member.guild.settings.get('ModLogKanalı'));

  let embed = new MessageEmbed()
    .setAuthor(member.user.username, member.user.displayAvatarURL({ format: 'png' }))
    .setColor('#cc0000')
    .setDescription('Kullanıcı Ayrıldı')
    .addField('Kullanıcı', member)
    .setTimestamp()
  if (ModLogKanalı)
    ModLogKanalı.send(embed);

  let embed1 = new MessageEmbed()
    .setAuthor(member.user.username, member.user.displayAvatarURL({ format: 'png' }))
    .setColor('#cc0000')
    .setDescription('Görüşürüz.')
    .addField('Ayrıldığın Sunucu', member.guild.name)
    .setTimestamp()
  member.send(embed1);
}