const { Command } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js');

module.exports = class AyarlarCommand extends Command {
	  constructor(client) {
	      super(client, {
		        name: 'ayarlar',
            aliases: ['settings', 'sunucu-ayarlar', 'sunucu-ayarları', 'sunucu-settings', 'server-settings', 'server-ayarlar'],
		      	group: 'sunucu',
			      memberName: 'ayarlar',
	      		description: 'Sunucudaki Ayarlanabilir Ayarları Gösterir.',
	      		guildOnly: true,
            userPermissions: ['ADMINISTRATOR'],
		    });
	  }

async run(msg) {

  const BaşvuruKanalı = msg.guild.channels.cache.get(msg.guild.settings.get('BaşvuruKanalı'));
  const ÇekilişKanalı = msg.guild.channels.cache.get(msg.guild.settings.get('ÇekilişKanalı'));
  const CezalarKanalı = msg.guild.channels.cache.get(msg.guild.settings.get('CezalarKanalı'));
  const ModLogKanalı = msg.guild.channels.cache.get(msg.guild.settings.get('ModLogKanalı'));
  const OtoRol = msg.guild.roles.cache.get(msg.guild.settings.get('OtoRol'));    
  const Prefix = msg.guild.commandPrefix;
  const SayaçKanalı =  msg.guild.settings.remove('SayaçKanalı');
  const Sayaç = msg.guild.settings.remove('Sayaç');

  const KüfürFiltresi = msg.guild.settings.get('KüfürFiltresi');
  const ReklamFiltresi = msg.guild.settings.get('ReklamFiltresi');
  const LinkFiltresi = msg.guild.settings.get('LinkFiltresi');

  const ResimliGirişÇıkışKanalı = msg.guild.settings.get('ResimliGirişÇıkışKanalı');
  const ResimliGiriş = msg.guild.settings.get('ResimliGiriş');
  const ResimliÇıkış = msg.guild.settings.get('ResimliÇıkış');

  const KayıtçıRolü = msg.guild.settings.get('KayıtçıRolü')
  const KayıtsızÜyeRolü = msg.guild.settings.get('KayıtsızÜyeRolü');
  const ErkekÜyeRolü = msg.guild.settings.get('ErkekÜyeRolü');
  const TeyitsizÜyeRolü = msg.guild.settings.get('TeyitsizÜyeRolü');
  const KadınÜyeRolü = msg.guild.settings.get('KadınÜyeRolü');

  const EkipRolü = msg.guild.roles.cache.get(msg.guild.settings.get('EkipRolü'));
  const EkipTagı = msg.guild.settings.get('EkipTagı');

  let embed = new MessageEmbed()
    .setColor('#0999ee')
    .setAuthor('Ayarlar', msg.guild.iconURL({ format: 'png' }))

    .addField('» Başvuru Kanalı',
              BaşvuruKanalı ? '<:bilgi:506200273375723520> <#' + BaşvuruKanalı + '>' : '<:bilgi:506200273375723520> Ayarlanmamış.', true)
    .addField('» Küfür Filtresi',
              KüfürFiltresi ? '<:aktif:513468432004415488> Açık' : '<:deaktif:506223700165787660>  Kapalı', true)
    .addField('» Resimli Giriş',
              ResimliGiriş ? '<:aktif:513468432004415488> Açık' : '<:deaktif:506223700165787660> Kapalı', true)


    .addField('» Mod-Log Kanalı',
              ModLogKanalı ? '<:bilgi:506200273375723520> <#' + ModLogKanalı + '>' : '<:bilgi:506200273375723520> Ayarlanmamış.', true)
    .addField('» Reklam Filtresi',
              ReklamFiltresi ? '<:aktif:513468432004415488> Açık' : '<:deaktif:506223700165787660>  Kapalı', true)
    .addField('» Resimli Çıkış',
              ResimliÇıkış ? '<:aktif:513468432004415488> Açık' : '<:deaktif:506223700165787660> Kapalı', true)


    .addField('» Cezalar Kanalı',
              CezalarKanalı ? '<:bilgi:506200273375723520> <#' + CezalarKanalı + '>' : '<:bilgi:506200273375723520> Ayarlanmamış.', true)
    .addField('» Link Filtresi',
              LinkFiltresi ? '<:aktif:513468432004415488> Açık' : '<:deaktif:506223700165787660>  Kapalı', true)
    .addField('» Resimli Giriş Çıkış Kanalı',
              ResimliGirişÇıkışKanalı ? '<:bilgi:506200273375723520> <#' + ResimliGirişÇıkışKanalı + '>' : '<:bilgi:506200273375723520> Ayarlanmamış.', true)


    .addField('» Çekiliş Kanalı',
              ÇekilişKanalı ? '<:bilgi:506200273375723520> <#' + ÇekilişKanalı + '>' : '<:bilgi:506200273375723520> Ayarlanmamış.', true)
    .addField('» Oto Rol',
              OtoRol ? '<:bilgi:506200273375723520> <@&' + OtoRol + '>' : '<:bilgi:506200273375723520> Ayarlanmamış.', true)
    .addField('» Prefix',
              '<:bilgi:506200273375723520> **' + Prefix + '**', true)


    .addField('» Sayaç Kanalı',
              SayaçKanalı ? '<:bilgi:506200273375723520> <#' + SayaçKanalı + '>' : '<:bilgi:506200273375723520> Ayarlanmamış.', true)
    .addField('» Sayaç Hedefi',
              Sayaç ? Sayaç : '<:bilgi:506200273375723520> Ayarlanmamış.', true)
    .addField('» Kayıtçı Rolü',
              KayıtçıRolü ? '<:bilgi:506200273375723520> <@&' + KayıtçıRolü + '>' : '<:bilgi:506200273375723520> Ayarlanmamış.', true)


    .addField('» Kayıtsız Üye Rolü',
              KayıtsızÜyeRolü ? '<:bilgi:506200273375723520> <@&' + KayıtsızÜyeRolü + '>' : '<:bilgi:506200273375723520> Ayarlanmamış.', true)
    .addField('» Teyitsiz Üye Rolü',
              TeyitsizÜyeRolü ? '<:bilgi:506200273375723520> <@&' + TeyitsizÜyeRolü + '>' : '<:bilgi:506200273375723520> Ayarlanmamış.', true)
    .addField('» Erkek Üye Rolü',
              ErkekÜyeRolü ? '<:bilgi:506200273375723520> <@&' + ErkekÜyeRolü + '>' : '<:bilgi:506200273375723520> Ayarlanmamış.', true)


    .addField('» Kadın Üye Rolü',
              KadınÜyeRolü ? '<:bilgi:506200273375723520> <@&' + KadınÜyeRolü + '>' : '<:bilgi:506200273375723520> Ayarlanmamış.', true)
    .addField('» Ekip Rolü',
              EkipRolü ? '<:bilgi:506200273375723520> <@&' + EkipRolü + '>' : '<:bilgi:506200273375723520> Ayarlanmamış.', true)
    .addField('» Ekip Tagı',
              EkipTagı ? '<:bilgi:506200273375723520> ' + EkipTagı : '<:bilgi:506200273375723520> Ayarlanmamış.', true)

  return msg.channel.send(embed)
}
}