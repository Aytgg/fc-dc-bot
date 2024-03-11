/*const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

const SQLite = require('better-sqlite3');
const sql = new SQLite('db.sqlite');

module.exports = class OtomatikCevaplayıcıEkleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'otomatik-cevaplayıcı-ekle',
            aliases: ['oto-cevaplayıcı-ekle', 'otomatik-cevaplayıcı', 'oto-cevaplayıcı', 'otomatik-cevapla', 'oto-cevapla'],
            group: 'sunucu',
            memberName: 'otomatik-cevaplayıcı-ekle',
            description: 'Sunucuya Otomatik Cevaplayıcı Ekler.',
            guildOnly: true,
            userPermissions: ['ADMINISTRATOR'],
            args: [
                {
                    key: 'mesaj',
                    prompt: 'Otomatik cevaplanacak mesajı yazın.',
                    type: 'string'
                },
                {
                    key: 'cevap',
                    prompt: 'Otomatik cevabı yazın.',
                    type: 'string'
                }
            ]
        });
    }

async run(msg, args) {
  let ModLogKanalı = msg.guild.channels.get(msg.guild.settings.get('ModLogKanalı'));

  const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name='oto_cevaplayicilar';").get();
  if (!table['count(*)']) {
    sql.prepare('CREATE TABLE oto_cevaplayicilar (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, sunucu TEXT NOT NULL, mesaj TEXT NOT NULL, cevap TEXT NOT NULL);').run();
    sql.pragma('synchronous = 1');
    sql.pragma('journal_mode = wal');
  }

  let getStmt = sql.prepare('SELECT * FROM oto_cevaplayicilar WHERE sunucu = ? AND mesaj = ?');
  let getStmt1 = sql.prepare('SELECT * FROM oto_cevaplayicilar WHERE sunucu = ?');
  let setStmt = sql.prepare('INSERT INTO oto_cevaplayicilar (sunucu, mesaj, cevap) VALUES (?, ?, ?)');

  let zatenVar = getStmt.get(msg.guild.id, args.mesaj);
  if (zatenVar) return msg.reply('Belirtilen argümanlar ile ayarlanmış bir otomatik cevaplayıcı zaten mevcut.');

  let oto_cevaplayıcı = getStmt1.get(msg.guild.id);

  if (!oto_cevaplayıcı) {
    oto_cevaplayıcı = {
        id: 1,
        sunucu: msg.guild.id,
        mesaj: args.mesaj,
        sebep: args.cevap
    }
  }

  setStmt.run(msg.guild.id, args.mesaj, args.cevap);
  msg.channel.send('Otomatik Cevaplayıcı Oluşturuldu\nMesaj:**`' + args.mesaj +'`**\nCevap:**`' + args.cevap + '`**');

  let embed = new MessageEmbed()
    .setColor('0x36393F')
    .setDescription('Otomatik Cevaplayıcı Eklendi')
    .addField('Mesaj', args.mesaj)
    .addField('Cevap', args.cevap)
  if (ModLogKanalı) ModLogKanalı.send(embed)
}
}*/