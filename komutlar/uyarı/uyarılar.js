/*const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

const moment = require('moment')
require('moment-timezone');

const SQLite = require('better-sqlite3');
const sql = new SQLite('db.sqlite');

module.exports = class UyarılarCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'uyarılar',
            aliases: ['warns', 'warnings'],
            group: 'altyetkili',
            memberName: 'uyarılar',
            description: 'Seçilen Kullanıcının Uyarılarını Gösterir.',
            guildOnly: true,
            args: [
                {
                    key: 'kullanıcı',
                    prompt: 'Uyarılarını görmek istediğiniz kullanıcıyı etiketleyin.',
                    type: 'member',
                    default: 'uyarılanlar'
                }
            ]
        });
    }

async run(msg, args) {

  const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'uyarilar';").get();
  if (!table['count(*)']) {
    sql.prepare('CREATE TABLE uyarilar (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, kullanici TEXT NOT NULL, sunucu TEXT NOT NULL, yetkili TEXT NOT NULL, sebep TEXT NOT NULL, zaman INTEGER NOT NULL);').run();
    sql.pragma('synchronous = 1');
    sql.pragma('journal_mode = wal');
  }

  if (args.kullanıcı == 'uyarılanlar') {
    const uyarılanlar = sql.prepare('SELECT DISTINCT kullanici, count(*) FROM uyarilar WHERE sunucu = ? GROUP BY kullanici ORDER BY id DESC;').all(msg.guild.id);

    const embed = new MessageEmbed()
        .setTitle('Uyarılanlar')
        .setAuthor(msg.guild.name, msg.guild.iconURL({ format: 'png' }))
        .setColor('0x36393F');
        for(const data of uyarılanlar) {
          embed.addField(this.client.users.get(data.kullanici).tag,  + data['count(*)'] + ' kez uyarıldı.');
        }
    return msg.channel.send(embed);
  }
  else {
    let getStmt = sql.prepare('SELECT * FROM uyarilar WHERE kullanici = ? AND sunucu = ?');
    let uyarılar = getStmt.all(args.kullanıcı.id, msg.guild.id);


    if (uyarılar.length == 0) return msg.channel.send('<@' + args.kullanıcı.id + '> Henüz uyarılmadı :hugging:');
    if (uyarılar.length >= 1) {
    let embed = new MessageEmbed()
        .setAuthor(args.kullanıcı.user.tag + ' Kullanıcısının Uyarıları', args.kullanıcı.user.displayAvatarURL)
        .setDescription(uyarılar.length + ' KEZ UYARILDI :slight_frown:')
        .setColor('0x36393F');
        for (var i = 0; i < uyarılar.length; i++) {
          let uyarı = uyarılar[i];
          embed.addField(moment(uyarı.zaman).locale('tr').tz('Europe/Istanbul').format("D MMM YYYY, hh.mm"), '**Sebep:** ' + uyarı.sebep + '\n**Yetkili:** ' + (this.client.users.get(uyarı.yetkili) || await this.client.fetchUser(uyarı.yetkili)).tag + '\n**ID:**' + uyarı.id, true)
        }
    msg.channel.send(embed)
  }
  }
}
}*/