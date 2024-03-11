/*const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

const SQLite = require('better-sqlite3');
const sql = new SQLite('db.sqlite');

module.exports = class UyarCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'uyar',
            aliases: ['uyarı', 'uyarı-ver', 'warn', 'w'],
            group: 'altyetkili',
            memberName: 'uyar',
            description: 'Seçilen Kullanıcıyı Uyarır.',
            guildOnly: true,
            userPermissions: ['MANAGE_MESSAGES'],
            args: [
                {
                    key: 'kullanıcı',
                    prompt: 'Uyarılacak kullanıcıyı etiketleyin.',
                    type: 'member',
                },
                {
                    key: 'sebep',
                    prompt: 'Kullanıcının uyarılma sebebini yazın.',
                    type: 'string'
                }
            ]
        });
    }

async run(msg, args) {

  let ModLogKanalı = msg.guild.channels.get(msg.guild.settings.get('ModLogKanalı'));
  let CezalarKanalı = msg.guild.channels.get(msg.guild.settings.get('CezalarKanalı'));

  const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name='uyarilar';").get();
  if (!table['count(*)']) {
    sql.prepare('CREATE TABLE uyarilar (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, kullanici TEXT NOT NULL, sunucu TEXT NOT NULL, yetkili TEXT NOT NULL, sebep TEXT NOT NULL, zaman INTEGER NOT NULL);').run();
    sql.pragma('synchronous = 1');
    sql.pragma('journal_mode = wal');
  }

  let getStmt = sql.prepare('SELECT * FROM uyarilar WHERE kullanici = ? AND sunucu = ?');
  let setStmt = sql.prepare('INSERT INTO uyarilar (kullanici, sunucu, yetkili, sebep, zaman) VALUES (?, ?, ?, ?, ?)');

  let uyarılar = getStmt.get(args.kullanıcı.id, msg.guild.id);

  if (!uyarılar) {
    uyarılar = {
        id: 1,
        kullanici: msg.author.id,
        sunucu: msg.guild.id,
        yetkili: msg.author.id,
        sebep: args.sebep,
        zaman: Date.now()
    }
  }
  setStmt.run(args.kullanıcı.id, msg.guild.id, msg.author.id, args.sebep, Date.now());

  let tümUyarılar = getStmt.all(args.kullanıcı.id, msg.guild.id)

  let embed = new MessageEmbed()
      .setAuthor('Kullanıcı Uyarıldı')
      .setColor('0x36393F')
      .addField('Yetkili', '<@' + msg.author.id + '>')
      .addField('Uyarılan', '<@' + args.kullanıcı.id + '>')
      .addField('Sebep', args.sebep)
      .setFooter("BU KULLANICI " + tümUyarılar.length + " KEZ UYARILDI")
  if (ModLogKanalı) {
    ModLogKanalı.send(embed);
    msg.channel.send('<:dogru:506200517249204239> ***<@' + args.kullanıcı.id + '> Uyarıldı***');
  }
  else msg.channel.send(embed)

  let embed1 = new MessageEmbed()
      .setAuthor('Uyarıldın')
      .setColor('0x36393F')
      .addField('Yetkili', '<@' + msg.author.id + '>')
      .addField('Sunucu:', msg.guild.name)
      .addField('Sebep:', args.sebep)
      .setFooter(tümUyarılar.length + " KEZ UYARILDIN !")      
  args.kullanıcı.send(embed1);
  if (CezalarKanalı) CezalarKanalı.send('<@' + args.kullanıcı.id + '> Uyarıldı. Sebep: **' + args.sebep + '**')
}
}*/