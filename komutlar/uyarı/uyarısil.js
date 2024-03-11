/*const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

const SQLite = require('better-sqlite3');
const sql = new SQLite('db.sqlite');

module.exports = class UyarısilCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'uyarısil',
            aliases: ['del-warn', 'delete-warn', 'remove-warn', 'del-warns', 'delete-warns', 'remove-warns', 'del-warning', 'delete-warnings', 'remove-warnings'],
            group: 'altyetkili',
            memberName: 'uyarısil',
            description: 'Seçilen Kullanıcının Uyarılarını Siler.',
            guildOnly: true,
            userPermissions: ['KICK_MEMBERS'],
            args: [
                {
                    key: 'kullanıcı',
                    prompt: 'Uyarıları silinecek kullanıcıyı etiketleyin.',
                    type: 'member',
                },
                {
                    key: 'id',
                    prompt: 'Silinecek uyarının ID\'sini yazın',
                    type: 'integer|string',
                    validate: (value, msg, arg) => {
                      let lc = value.toLowerCase()
                      if (lc == 'hepsi' || lc == 'tamamı' || lc == 'tümü' || lc == 'all') return true;

                      return this.client.registry.types.get('integer').validate(value, msg, arg);
                    }
                }
            ]
        });
    }

async run(msg, args) {

  let ModLogKanalı = msg.guild.channels.get(msg.guild.settings.get('ModLogKanalı'));

  const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name='uyarilar';").get();
  if (!table['count(*)']) {
    sql.prepare('CREATE TABLE uyarilar (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, kullanici TEXT NOT NULL, sunucu TEXT NOT NULL, yetkili TEXT NOT NULL, sebep TEXT NOT NULL, zaman INTEGER NOT NULL);').run();
    sql.pragma('synchronous = 1');
    sql.pragma('journal_mode = wal');
  }

  if (args.id == 'hepsi' || args.id == 'tamamı' || args.id == 'tümü' || args.id == 'all') {
    let delStmt = sql.prepare('DELETE FROM uyarilar WHERE kullanici = ? AND sunucu = ?');
    delStmt.run(args.kullanıcı.id, msg.guild.id);

    let embed = new MessageEmbed()
        .setAuthor('Kullanıcının Uyarıları Silindi')
        .setColor('0x36393F')
        .addField('Yetkili', '<@' + msg.author.id + '>')
        .addField('Uyarıları Silinen', '<@' + args.kullanıcı.id + '>')
    if (ModLogKanalı) {
      ModLogKanalı.send(embed);
      msg.channel.send('<:dogru:506200517249204239> ***<@' + args.kullanıcı.id + '> Kullanıcısının Uyarıları Silindi***');
    }
    else msg.channel.send(embed)

    let embed1 = new MessageEmbed()
        .setAuthor('Uyarıların Silindi')
        .setColor('0x36393F')
        .addField('Yetkili', '<@' + msg.author.id + '>')
        .addField('Sunucu:', msg.guild.name)
    args.kullanıcı.send(embed1);
  }
  else {
    let delStmt = sql.prepare('DELETE FROM uyarilar WHERE id = ? AND kullanici = ? AND sunucu = ?');
    delStmt.run(args.id, args.kullanıcı.id, msg.guild.id);

    let embed = new MessageEmbed()
        .setAuthor('Kullanıcının Uyarısı Silindi')
        .setColor('0x36393F')
        .addField('Yetkili', '<@' + msg.author.id + '>')
        .addField('Uyarıları Silinen', '<@' + args.kullanıcı.id + '>')
        .addField('Silinen Uyarının ID\'si:', args.id)
    if (ModLogKanalı) {
      ModLogKanalı.send(embed);
      msg.channel.send('<:dogru:506200517249204239> ***<@' + args.kullanıcı.id + '> Kullanıcısının `' + args.id + '` ID\'li Uyarıları Silindi***');
    }
    else msg.channel.send(embed)

    let embed1 = new MessageEmbed()
        .setAuthor('Uyarın Silindi')
        .setColor('0x36393F')
        .addField('Yetkili', '<@' + msg.author.id + '>')
        .addField('Sunucu:', msg.guild.name)
        .addField('Silinen Uyarının ID\'si:', args.id)
    args.kullanıcı.send(embed1);
  }
}
}*/