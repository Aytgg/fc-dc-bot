const { MessageEmbed } = require('discord.js');

module.exports = async (oldMessage, newMessage) => {
  if (!newMessage.guild) return;
  if (!oldMessage.content || !newMessage.content) return;

  let ModLogKanalı = newMessage.guild.channels.cache.get(newMessage.guild.settings.get('ModLogKanalı'));
  if (!ModLogKanalı) return

  let embed = new MessageEmbed()
    .setAuthor(newMessage.author.tag, newMessage.author.displayAvatarURL({ format: 'png' }))
    .setColor("#0999ee")
    .setDescription("Mesaj Değiştirildi !")
    .addField("Mesajın Değiştirildiği Kanal", oldMessage.channel)
    .addField("Eski Mesaj", oldMessage.content, true)
    .addField("Yeni Mesaj", newMessage.content, true)
    .setTimestamp()
  ModLogKanalı.send(embed);
}