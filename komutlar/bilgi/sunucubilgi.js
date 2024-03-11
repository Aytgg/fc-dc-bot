const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

const moment = require('moment');
require('moment-duration-format');
require('moment-timezone');

module.exports = class SunucuBilgiCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'sunucu-bilgi',
            aliases: ['server-info', 'sunucu', 'server', 'server-bilgi'],
            group: 'bilgi',
            memberName: 'sunucu-bilgi',
            description: 'Sunucu Hakkında Bilgi Verir.',
            guildOnly: true
        });
    }

async run(msg) {

	let bölge = {
    'us-central': 'Amerika :flag_us:',
    'us-east': 'Doğu Amerika :flag_us:',
    'us-south': 'Güney Amerika :flag_us:',
    'us-west': 'Batı Amerika :flag_us:',
    'eu-west': 'Batı Avrupa :flag_eu:',
    'eu-central': 'Avrupa :flag_eu:',
    'singapore': 'Singapur :flag_sg:',
    'london': 'Londra :flag_gb:',
    'japan': 'Japonya :flag_jp:',
    'russia': 'Rusya :flag_ru:',
    'hongkong': 'Hong Kong :flag_hk:',
    'brazil': 'Brezilya :flag_br:',
    'singapore': 'Singapur :flag_sg:',
    'sydney': 'Sidney :flag_au:',
    'southafrica': 'Güney Afrika :flag_za:'
	}

  let KanalSayısı = msg.guild.channels.size - msg.guild.channels.filter(ch => ch.type =='category').size

  const emojiList = msg.guild.emojis.map(e=>e.toString()).join("**,** ");
  const embed = new MessageEmbed()
    .setThumbnail(msg.guild.iconURL({ format: 'png' }))
    .addField('Sunucu Adı', msg.guild.name, true)
    .addField('Sunucu ID', msg.guild.id, true)
    .addField('Sunucu Sahibi', msg.guild.owner, true)
    .addField('Sunucu Bölgesi', bölge[msg.guild.region], true)
    .addField('AFK Kanalı', msg.guild.afkChannel || 'Seçilmedi', true)
    .addField('AFK Süresi', moment.duration(msg.guild.afkTimeout, 'seconds').format('hh.mm.ss'), true)
    .addField('Toplam Kanal Sayısı',
              '***`' + msg.guild.channels.filter(ch => ch.type == 'category').size
              + ' Kategori`*** / ' +
              '***`' + (msg.guild.channels.size - msg.guild.channels.filter(ch => ch.type =='category').size)
              + ' Kanal`*** / ' +
              '***`' + msg.guild.channels.filter(ch => ch.type == 'text').size
              + ' Yazı`*** / ' +
              '***`' + msg.guild.channels.filter(ch => ch.type == 'voice').size
              + ' Ses`***'
             )
    .addField('Toplam Üye Sayısı [' + msg.guild.members.size + ']',
              '<a:cevrim_ici:535449858220228608> ' + msg.guild.members.filter(m => m.user.presence.status == 'online').size + ' Çevrimiçi ' +
              '<a:bosta:535449857687814154> ' + msg.guild.members.filter(m => m.user.presence.status == 'idle').size + ' Boşta ' +
              '<a:rahatsiz_etmeyin:535449857809317888> ' + msg.guild.members.filter(m => m.user.presence.status == 'dnd').size + ' Rahatsız Etmeyin ' +
              '\n' +
              '<a:cevrim_disi:535449857947729921>' + msg.guild.members.filter(m => m.user.presence.status == 'offline').size + ' Çevrimdışı / Görünmez ' +
              '<:discordBot:506218262753837073> ' + msg.guild.members.filter(m => m.user.bot).size + ' Bot'
              )
    /*if (emojiList < 1) return embed.addField('Sunucu Emojileri', 'Sunucuda Hiç Emoji Bulunmuyor.');
    else embed.addField('Sunucu Emojileri [' + msg.guild.emojis.size + ']', 'Sunucuda Çok Fazla Emoji Bulunuyor Ve Discord Bunların Gösterilmesine İzin Vermiyor.')*/
    .setFooter('Oluşturulma Tarihi: ' + moment(msg.guild.createdAt).locale('tr').tz('Europe/Istanbul').format('LL'))
    .setColor('0x36393F')
  return msg.channel.send(embed);
}
}