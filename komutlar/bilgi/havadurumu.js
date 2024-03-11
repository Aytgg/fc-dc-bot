const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class HavaDurumuCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hava-durumu',
            aliases: ['hava-durum', 'weather'],
            group: 'bilgi',
            memberName: 'havadurumu',
            description: 'Belirtilen Yerin Hava Durumu Hakkında Bilgi Verir.',
            args: [
                {
                    key: 'yer',
                    prompt: 'Hava durumunu öğrenmek istediğiniz yeri yazın.',
                    type: 'string'
                }
            ]
        });
    }

async run(msg, args) {

  const api = 'http://api.openweathermap.org/data/2.5/weather?q=' + args.yer.toLowerCase().replace('i̇', 'i') + '&appid=1aa2c453a5327f41a89ef15167bc8def'

  function windDirection(derece)
  {
    if (derece < 11 || derece > 348)         return "Kuzey";
    else if (derece > 11 && derece < 33)     return "Kuzey-Kuzeydoğu";
    else if (derece > 33 && derece < 56)     return "Kuzeydoğu";
    else if (derece > 56 && derece < 78)     return "Doğu-Kuzeydoğu";
    else if (derece > 78 && derece < 101)    return "Doğu";
    else if (derece > 101 && derece < 123)   return "Doğu-Güneydoğu";
    else if (derece > 123 && derece < 146)   return "Güneydoğu";
    else if (derece > 146 && derece < 168)   return "Güney-Güneydoğu";
    else if (derece > 168 && derece < 191)   return "Güney";
    else if (derece > 191 && derece < 213)   return "Güney-Güneybatı";
    else if (derece > 213 && derece < 236)   return "Güneybatı";
    else if (derece > 236 && derece < 258)   return "Batı-Güneybatı";
    else if (derece > 258 && derece < 281)   return "Batı";
    else if (derece > 281 && derece < 303)   return "Batı-Kuzeybatı";
    else if (derece > 303 && derece < 326)   return "Kuzeybatı";
    else if (derece > 326 && derece < 348)   return "Kuzey-Kuzeybatı";
    else return "N/A";
  }

  function UnixToDate(unix)
  {
    var saat = new Date(unix*1000).getHours();
    var dakika = new Date(unix*1000).getMinutes();
    var text = saat + '.' + dakika
    return text;
  }

  try {
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

    function Get(yourUrl){
      var Httpreq = new XMLHttpRequest();
      Httpreq.open('GET', yourUrl, false);
      Httpreq.send(null);
      return Httpreq.responseText;
    }

    var json = JSON.parse(Get(api));
    var coord = json.coord;
    var weather = json.weather[0];
    var main = json.main;
    var wind = json.wind;
    var clouds = json.clouds;
    var sys = json.sys;

    var cc = main.temp;
    var hc = main.temp_max;
    var lc = main.temp_min;
    var currentcelsius = cc - 273.15;
    var currentf1 = currentcelsius * 1.8;
    var currentfahrenheit = currentf1 + 32;
    var ccelsius = Math.round(currentcelsius);
    var cfahrenheit = Math.round(currentfahrenheit);

    var highcelsius = hc - 273.15;
    var highf1 = highcelsius * 1.8;
    var highfahrenheit = highf1 + 32;
    var hcelsius = Math.round(highcelsius);
    var hfahrenheit = Math.round(highfahrenheit);

    var lowcelsius = lc - 273.15;
    var lowf1 = lowcelsius * 1.8;
    var lowfahrenheit = lowf1 + 32;
    var lcelsius = Math.round(lowcelsius);
    var lfahrenheit = Math.round(lowfahrenheit);

    let embed = new MessageEmbed()
      .setTitle(json.name + ','   + sys.country +   ' için Hava Durumu')
      .setThumbnail('http://openweathermap.org/img/w/' + weather.icon + '.png')
      .setColor('0x36393F')
      .addField('Koordinatları', 'Enlem: **' + coord.lat + '**\nBoylam: **' + coord.lon + '**', true)
      .addField('Şehrin ID\'si', '**' + json.id + '**', true)
      .addField('Rüzgar', 'Yönü: **' + windDirection(wind.deg) + '**\nHızı: **' + wind.speed + 'm/s**', true)
      .addField('Bulut Oranı', '**%' + clouds.all + '**', true)
      .addField('Hava Koşulları',
                'Mevcut Sıcaklık: **' + ccelsius + ' °C / ' + cfahrenheit + ' °F**' + "\n" +
                'En Yüksek Sıcaklık: **' + hcelsius + ' °C / ' + hfahrenheit + ' °F**' + "\n" +
                'En Düşük Sıcaklık: **' + lcelsius + ' °C / ' + lfahrenheit + ' °F**' + "\n" +
                'Nem Oranı: **%' + main.humidity + '**' + "\n" +
                'Barometrik Basınç: **' + main.pressure + '**'
                , true)
      .addField('Güneş','Gündoğumu: **' + UnixToDate(sys.sunrise) + '**\nGünbatımı: **' + UnixToDate(sys.sunset) + '**', true)
    return msg.channel.send(embed)
  } catch (error) {
    let embed = new MessageEmbed()
      .setColor('0x36393F')
      .setDescription('Bir hata ile karşılaştık : \n`' + error.message + '`')
    return msg.channel.send(embed);
  }
}
}