const { MessageEmbed } = require('discord.js');

module.exports = async (messageDelete) => {
  if (messageDelete.author.bot) return;
  if (!messageDelete.content) return;

  let ModLogKanalı = messageDelete.guild.channels.cache.get(messageDelete.guild.settings.get('ModLogKanalı'));
  if (!ModLogKanalı) return

  let embed = new MessageEmbed()
    .setAuthor(messageDelete.author.tag, messageDelete.author.displayAvatarURL({ format: 'png' }))
    .setColor("#cc0000")
    .setDescription("Mesaj Silindi !")
    .addField("Mesajın Silindiği Kanal", messageDelete.channel, true)
    .addField("Silinen Mesaj", messageDelete.content, true)
    .setTimestamp()
  ModLogKanalı.send(embed);
}