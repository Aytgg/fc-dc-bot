const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class YardımCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'yardım',
            aliases: ['y', 'help', 'h'],
            group: 'bot',
            memberName: 'yardım',
            description: 'Botun Bütün Komutlarını Gösterir.',
            args: [
                {
                    key: 'kategori',
                    prompt: 'Yardım kategorisi seçin.',
                    type: 'string',
                    default: 0,
                }
            ]
        });
    }
  
async run(msg, args) {

  let prefix = this.client.commandPrefix
  if(msg.guild) prefix = msg.guild.commandPrefix ? msg.guild.commandPrefix : this.client.commandPrefix

  if (['bilgi', '1'].includes(args.kategori))
  {
    var embed = new MessageEmbed()
      .setAuthor('YARDIM')
      .setColor('0x36393F')
      .setDescription('Bilgi Komutları')
      .addField(prefix + 'bilgi:', 'Bot Hakkında Bilgi Verir.')
      .addField(prefix + 'sunucubilgi:', 'Sunucu Hakkında Bilgi Verir.')
      .addField(prefix + 'havadurumu <konum>:', 'Belirtilen Yerin Hava Durumu Hakkında Bilgi Verir.')
      .addField(prefix + 'döviz:', 'Anlık Dolar Ve Euro Kurlarının Alış Ve Satış Fiyatlarını Gösterir.')
      .addField(prefix + 'çeviri <dil1> <dil2> <metin>:', 'Çeviri Yapar.')
    msg.channel.send(embed)
  }

  else if (['müzik', '2'].includes(args.kategori))
  {
    var embed = new MessageEmbed()
      .setAuthor('YARDIM')
      .setColor('0x36393F')
      .setDescription('Müzik Komutları')
      .addField(prefix + 'çal <Link / Şarkı Adı>:', 'Şarkı Çalar.')
      .addField(prefix + 'duraklat:', 'Çalmakta Olan Şarkıyı Duraklatır.')
      .addField(prefix + 'devamettir:', 'Duraklatılmış Olan Şarkıyı Devam Ettirir.')
      .addField(prefix + 'durdur:', 'Çalmakta Olan Şarkıyı Durdurur.')
      .addField(prefix + 'atlaoyla:', 'Sonraki Şarkıya Geçer.')
      .addField(prefix + 'kuyruk:', 'Kuyruktaki Şarkıları Gösterir.')
      .addField(prefix + 'ayrıl:', 'Sesli Odadan Ayrılır.')
    msg.channel.send(embed)
  }

  else if (['sunucu', '3'].includes(args.kategori))
  {
    var embed = new MessageEmbed()
      .setAuthor('YARDIM')
      .setColor('0x36393F')
      .setDescription('Sunucu Komutları')
      .addField(prefix + 'ayarlar:', 'Sunucudaki Ayarlanabilir Ayarları Gösterir.')
      .addField(prefix + 'mod-log-kanalı-ayarla <#kanal / kapat>:', 'Mod Log Kanalını Ayarlamanızı Sağlar.')
      .addField(prefix + 'oto-rol <@&rol / kapat>', 'Sunucuya Yeni Gelenlerin Otomatik Olarak Alacağı Rolü Ayarlamanızı Sağlar.')
      .addField(prefix + 'filtreler <filtre>', 'Sunucudaki Filtreleri Açıp Kapatmanızı Sağlar.')
      .addField(prefix + 'cezalar-kanalı-ayarla <#kanal / kapat>:', 'Cezaların Gönderileceği Kanalı Ayarlamanızı Sağlar.')      
      .addField(prefix + 'otomatik-cevaplayıcı-ekle <mesaj> <cevap>', 'Sunucuya Otomatik Cevaplayıcı Ekler.')
      .addField(prefix + 'resimli-giriş-çıkış-kanalı-ayarla <#kanal / kapat>', 'Resimli Giriş Çıkışların Gönderileceği Kanalı Ayarlamanızı Sağlar.')
      .addField(prefix + 'sayaç-kanalı-ayarla <#kanal / kapat>', 'Sayacın Çalışacağı Kanalı Ayarlamanızı Sağlar.')
      .addField(prefix + 'sayaç <sayı>', 'Sayacı Ayarlamanızı Sağlar.')
    msg.channel.send(embed)
  }

  else if (['yetkili', '4'].includes(args.kategori))
  {
    var embed = new MessageEmbed()
      .setAuthor('YARDIM')
      .setColor('0x36393F')
      .setDescription('Yetkili Komutları')
      .addField(prefix + 'herkesedm <mesaj>:', 'İstenilen Mesajı Sunucudaki Herkese DM Olarak Gönderir.')
      .addField(prefix + 'yasakla <@bahsetme> <sebep>:', 'Bahsedilen Kişiyi Sunucudan Yasaklar.')
      .addField(prefix + 'at <@bahsetme> <sebep>:', 'Bahsedilen Kişiyi Sunucudan Atar.')
      .addField(prefix + 'sustur <@bahsetme> <süre> <sebep>', 'Bahsedilen Kişiyi Belirtilen Zaman Kadar Susturur.')
    msg.channel.send(embed)
  }

  else if (['altyetkili', '5'].includes(args.kategori))
  {
    var embed = new MessageEmbed()
      .setAuthor('YARDIM')
      .setColor('0x36393F')
      .setDescription('Alt Yetkili Komutları')
      .addField(prefix + 'mesajsil:', 'Belirlenen Miktardaki Mesajı Siler.')
      .addField(prefix + 'kayıtsızlaradm:', 'Eskiden Belirlenmiş Olan Mesajı Sunucuda Kayıt Olmamış Kişilere DM Olarak Gönderir.')
    msg.channel.send(embed)
  }

  else if (['ekip', '6'].includes(args.kategori))
  {
    var embed = new MessageEmbed()
      .setAuthor('YARDIM')
      .setColor('0x36393F')
      .setDescription('Ekip Komutları')
      .addField(prefix + 'ekibekatıl:', 'Ekip Rolünü Almanızı Sağlar.')
      .addField(prefix + 'ekip-rolü-ayarla <@&rol / kapat>:', 'Sunucudaki Ekip Rolünü Seçmenizi Sağlar.')
      .addField(prefix + 'ekip-tagı-ayarla <tag / kapat>:', 'Sunucudaki Ekip Tagını Seçmenizi Sağlar.')
    msg.channel.send(embed)
  }

  else if (['uyarı', '7'].includes(args.kategori))
  {
    var embed = new MessageEmbed()
      .setAuthor('YARDIM')
      .setColor('0x36393F')
      .setDescription('Alt Yetkili Komutları')
      .addField(prefix + 'uyar <@bahsetme> <sebep>:', 'Seçilen Kullanıcıyı Uyarır.')
      .addField(prefix + 'uyarılar <@bahsetme>:', 'Seçilen Kullanıcının Uyarılarını Gösterir.')
      .addField(prefix + 'uyarısil <@bahsetme / hepsi>:', 'Seçilen Kullanıcının Uyarılarını Siler.')
    msg.channel.send(embed)
  }

  else if (['kayıt', '8'].includes(args.kategori))
  {
    var embed = new MessageEmbed()
      .setAuthor('YARDIM')
      .setColor('0x36393F')
      .setDescription('Kayıt Komutları')
      .addField(prefix + 'kayıt <@bahsetme> <isim> <yaş> <cinsiyet>:', 'Kullanıcıyı Kayıt Etmenizi Sağlar.')
      .addField(prefix + 'kayıtçı-rolü-ayarla <@&rol>:', 'Sunucudaki Kayıtçı Rolünü Seçmenizi Sağlar.')
      .addField(prefix + 'kayıtsız-üye-rolü-ayarla <@&rol>:', 'Sunucudaki Kayıtsız Üye Rolünü Seçmenizi Sağlar.')
      .addField(prefix + 'erkek-üye-rolü-ayarla <@&rol>:', 'Sunucudaki Erkek Üye Rolünü Seçmenizi Sağlar.')
      .addField(prefix + 'teyitsiz-üye-rolü-ayarla <@&rol>:', 'Sunucudaki Teyitsiz Üye Rolünü Seçmenizi Sağlar.')
      .addField(prefix + 'kadın-üye-rolü-ayarla <@&rol>:', 'Sunucudaki Kadın Üye Rolünü Seçmenizi Sağlar.')
    msg.channel.send(embed)
  }

  else if (['başvuru', '9'].includes(args.kategori))
  {
    var embed = new MessageEmbed()
      .setAuthor('YARDIM')
      .setColor('0x36393F')
      .setDescription('Başvuru Komutları')
      .addField(prefix + 'başvuru', 'Başvuru Yapmanızı Sağlar.')
      .addField(prefix + 'başvuru-kanalı-ayarla <#kanal / kapat>', 'Başvuru Kanalını Ayarlamanızı Sağlar.')
    msg.channel.send(embed)
  }

  else if (['çekiliş', '10'].includes(args.kategori))
  {
    var embed = new MessageEmbed()
      .setAuthor('YARDIM')
      .setColor('0x36393F')
      .setDescription('Başvuru Komutları')
      .addField(prefix + 'çekiliş', 'Çekiliş Yapmanızı Sağlar.')
      .addField(prefix + 'çekiliş-kanalı-ayarla <#kanal / kapat>', 'Çekiliş Kanalını Ayarlamanızı Sağlar.')
    msg.channel.send(embed)
  }

  else if (['profil', '11'].includes(args.kategori))
  {
    var embed = new MessageEmbed()
      .setAuthor('YARDIM')
      .setColor('0x36393F')
      .setDescription('Profil Komutları')
      .addField(prefix + 'profil <@bahsetme>', 'Bahsedilen Kişinin Profilini Gösterir.')
      .addField(prefix + 'isimayarla <isim>:', 'Profilinizdeki İsminizi Ayarlar.')
      .addField(prefix + 'soyisimayarla <soyisim>:', 'Profilinizdeki Soyisminizi Ayarlar.')
      .addField(prefix + 'yaşayarla <yaş>:', 'Profilinizdeki Yaşınızı Ayarlar.')
      .addField(prefix + 'hakkındaayarla <hakkında>:', 'Profilinizdeki Hakkındanızı Ayarlar.')
      .addField(prefix + 'evlenmeteklifet <@bahsetme>:', 'Bahsedilen Kişiye Evlenme Teklif Eder.')
      .addField(prefix + 'evlenmeteklifinikabulet:', 'Evlenme Teklifini Kabul Eder.')
      .addField(prefix + 'evlenmeteklifinireddet:', 'Evlenme Teklifini Reddeder.')
      .addField(prefix + 'boşan:', 'Evlendiğiniz Kişiden Boşanırsınız.')
    msg.channel.send(embed)
  }

  else if (['eğlence', '12'].includes(args.kategori))
  {
    var embed = new MessageEmbed()
      .setAuthor('YARDIM')
      .setColor('0x36393F')
      .setDescription('Eğlence Komutları')
      .addField(prefix + 'sahteyaz <@bahsetme> <mesaj>', 'Etiketlenen Kişiye Sahte Mesaj Yazdırır.')
      .addField(prefix + 'konuş <mesaj>', 'Botla Sohbet Edersin.')
      .addField(prefix + 'steamoyun <Oyun Adı>:', 'Belirtilen Steam Oyununun Bilgilerini Gösterir.')
      .addField(prefix + 'slot:', 'Slot Oyunu Oynarsınız.')
      .addField(prefix + 'aşkölçer <@bahsetme>:', 'Bahsedilen Kişi İle Aranızdaki Aşk Yüzdesini Gösterir.')
      .addField(prefix + 'sarıl <@bahsetme>:', 'Bahseddilen Kişiye Sarılırsınız.')
      .addField(prefix + 'besle <@bashetme>:', 'Bahsedilen Kişiyi Beslersiniz.')
      .addField(prefix + 'okşa <@bahsetme>:', 'Bahsedilen Kişiyi Okşarsınız.')
      .addField(prefix + 'öp <@bahsetme>:', 'Bahsedilen Kişiyi Öpersiniz.')
    msg.channel.send(embed)
  }

  else
  {
    let embed = new MessageEmbed()
      .setAuthor('YARDIM')
      .setColor('0x36393F')
      .setDescription('Yardım Kategorileri\n' +
                      '```css\n[~1~ ~Bilgi~] Botun butun bilgi komutlarini gosterir.```' +
                      '```css\n[~2~ ~Müzik~] Botun butun muzik komutlarini gosterir.```' +
                      '```css\n[~3~ ~Sunucu~] Botun butun sunucu komutlarini gosterir.```' +
                      '```css\n[~4~ ~Yetkili~] Botun butun yetkili komutlarini gosterir.```' +
                      '```css\n[~5~ ~Alt Yetkili~] Botun butun alt yetkili komutlarini gosterir.```' +
                      '```css\n[~6~ ~Ekip~] Botun butun ekip komutlarini gosterir.```' +
                      '```css\n[~7~ ~Uyarı~] Botun butun uyari komutlarini gosterir.```' +
                      '```css\n[~8~ ~Kayıt~] Botun butun kayit komutlarini gosterir.```' +
                      '```css\n[~9~ ~Başvuru~] Botun butun basvuru komutlarini gosterir.```' +
                      '```css\n[~10~ ~Çekiliş~] Botun butun cekilis komutlarini gosterir.```' +
                      '```css\n[~11~ ~Profil~] Botun butun profil komutlarini gosterir.```' +
                      '```css\n[~12~ ~Eğlence~] Botun butun eglence komutlarini gosterir.```' +
                      '\n' + prefix + 'yardım <kategori>')
    msg.channel.send(embed)
  }
}
}