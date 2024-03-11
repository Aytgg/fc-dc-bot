const { MessageEmbed } = require('discord.js');

module.exports = async (member) => {
  let SayaçKanalı = member.guild.channels.cache.get(member.guild.settings.get('SayaçKanalı'));
  if (!SayaçKanalı) return;
  let Sayaç = member.guild.settings.get('Sayaç');
  if (!Sayaç) return;

  SayaçKanalı.send(
                   ':inbox_tray: Kullanıcı Katıldı!**`'
                   + Sayaç + '`** Kişi Olmaya **`'
                   + (Sayaç - member.guild.memberCount) + '`** Kişi Kaldı **`'
                   + member.guild.memberCount + '`**  Kişi Var! '
                   + '<:evet:487271778834579457> ***' + member.user.tag + '***'
                  );

  try {
    if(Sayaç <= member.guild.members.size) {
      const embed = new MessageEmbed()
          .setDescription('Sunucu ' + Sayaç + ' kullanıcıya ulaştı, sayaç kapatıldı.')
          .setColor('0x36393F')
          .setTimestamp()
      SayaçKanalı.send(embed)

      member.guild.settings.remove('Sayaç')
    }
  } catch (e) { return console.log(e); }
}