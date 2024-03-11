const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = async (oldMember, newMember) => {
  let ModLogKanalı = newMember.guild.channels.cache.get(newMember.guild.settings.get('ModLogKanalı'));
  if (!ModLogKanalı) return;

  if (newMember.roles.size > oldMember.roles.size) {
    let newRole = newMember.roles.array().filter(function (role) {
      if (!oldMember.roles.array().includes(role)) return true
    })
    if (!newRole) return

    let embed = new MessageEmbed()
      .setAuthor(newMember.user.username, newMember.user.displayAvatarURL({ format: 'png' }))
      .setColor('#00ff00')
      .setDescription('Rol Verildi')
      .addField('Kullanıcı', newMember)
      .addField('Verilen Roller', newRole.map(r => '<@&' + r.id + '>').join(', '))
      .setTimestamp()
    ModLogKanalı.send(embed);
  }

  if (oldMember.roles.size > newMember.roles.size) {
    let removedRole = oldMember.roles.array().filter(function (role) {
      if (!newMember.roles.array().includes(role)) return true
    })
    if (!removedRole) return

    let embed = new MessageEmbed()
      .setAuthor(newMember.user.username, newMember.user.displayAvatarURL({ format: 'png' }))
      .setColor('#cc0000')
      .setDescription('Rol Alındı')
      .addField('Kullanıcı:', newMember)
      .addField('Alınan Roller:', removedRole.map(r => '<@&' + r.id + '>').join(', '))
      .setTimestamp()
    console.log(removedRole)
    ModLogKanalı.send(embed);
  }

  if (newMember.nickname !== oldMember.nickname) {
    if (oldMember.nickname == null) {
      let embed = new MessageEmbed()
        .setAuthor(newMember.user.username, newMember.user.displayAvatarURL({ format: 'png' }))
        .setColor('#00ff00')
        .setDescription('Kullanıcı Adı Eklendi')
        .addField('Kullanıcı', newMember)
        .addField('Kullanıcı Adı', newMember.nickname)
        .setTimestamp()
      ModLogKanalı.send(embed);
    }
    else
    {
      let embed = new MessageEmbed()
        .setAuthor(newMember.user.username, newMember.user.displayAvatarURL({ format: 'png' }))
        .setColor('#00ff00')
        .setDescription('Kullanıcı Adı Değiştirildi')
        .addField('Kullanıcı', newMember)
        .addField('Eski Kullanıcı Adı', oldMember.nickname, true)
        .addField('Yeni Kullanıcı Adı', newMember.nickname || newMember.user.username, true)
        .setTimestamp()
      ModLogKanalı.send(embed);
    }
  }
}