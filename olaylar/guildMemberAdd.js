const { MessageEmbed } = require('discord.js');

const moment = require('moment');

module.exports = async (member) => {
  let ModLogKanalı = member.guild.channels.cache.get(member.guild.settings.get('ModLogKanalı'));
  let OtoRol = member.guild.roles.cache.get(member.guild.settings.get('OtoRol'));

  let embed = new MessageEmbed()
    .setAuthor(member.user.username, member.user.displayAvatarURL({ format: 'png' }))
    .setColor('#00ff00')
    .setDescription('Kullanıcı Katıldı')
    .addField('Kullanıcı', '<@' + member.id + '>')
    if (OtoRol) {
      embed.addField('Verilen Rol', OtoRol)
    }
    embed.setTimestamp()
  if (ModLogKanalı)
    ModLogKanalı.send(embed);

  let embed1 = new MessageEmbed()
    .setAuthor(member.user.username, member.user.displayAvatarURL({ format: 'png' }))
    .setColor('#00ff00')
    .setDescription('Hoşgeldin')
    .addField('Katıldığın Sunucu', member.guild.name)
    if (OtoRol) {
      embed1.addField('Verilen Rol', OtoRol.name)
    }
    embed1.setTimestamp()
  member.send(embed1);
}