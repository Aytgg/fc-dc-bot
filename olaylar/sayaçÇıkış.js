const { MessageEmbed } = require('discord.js');

module.exports = async (member) => {
  let SayaçKanalı = member.guild.channels.cache.get(member.guild.settings.get('SayaçKanalı'));
  if (!SayaçKanalı) return;
  let Sayaç = member.guild.settings.get('Sayaç');
  if (!Sayaç) return;

  SayaçKanalı.send(
                   ':outbox_tray: Kullanıcı Katıldı!**`'
                   + Sayaç + '`** Kişi Olmaya **`'
                   + (Sayaç - member.guild.memberCount) + '`** Kişi Kaldı **`'
                   + member.guild.memberCount + '`**  Kişi Var! '
                   + '<:hayir:487271755530895369> ***' + member.user.tag + '***'
                  );
}