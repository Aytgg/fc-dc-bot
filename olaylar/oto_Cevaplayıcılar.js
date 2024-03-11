const SQLite = require('better-sqlite3');
const sql = new SQLite('db.sqlite');

module.exports = async msg => {
  if (!msg.guild) return;

  let getStmt = sql.prepare('SELECT cevap FROM oto_cevaplayicilar WHERE sunucu = ? AND mesaj = ?');

  let oto_cevaplayıcı = getStmt.get(msg.guild.id, msg.content)

  if (!oto_cevaplayıcı) return;

  let cevapKullanıcı = oto_cevaplayıcı.cevap.replace('{{kullanıcı.isim}}', msg.author.username).replace('{{kullanıcı.id}}', msg.author.id).replace('{{kullanıcı.tag}}', msg.author.tag).replace('{{@kullanıcı}}', '<@' + msg.author.id + '>');
  let cevapSunucu = cevapKullanıcı.replace('{{sunucu.isim}}', msg.guild.name).replace('{{sunucu.id}}', msg.guild.id).replace('{{sunucu.üyeler}}', msg.guild.members.size);
  let cevapKanal = cevapSunucu.replace('{{kanal.isim}}', msg.channel.name).replace('{{kanal.id}}', msg.channel.id).replace('{{#kanal}}', '<#' + msg.channel.id + '>');

  let cevap = cevapKanal;

  if (oto_cevaplayıcı) return msg.channel.send(cevap);
}