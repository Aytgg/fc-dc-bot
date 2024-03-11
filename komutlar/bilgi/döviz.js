const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

const moment = require('moment')
require('moment-timezone')

module.exports = class DövizCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'döviz',
            aliases: ['döviz-kur', 'döviz-kuru', 'dolar', 'euro', 'dövizler', 'döviz-kurları'],
            group: 'bilgi',
            memberName: 'döviz',
            description: 'Anlık Dolar Ve Euro Kurlarının Alış Ve Satış Fiyatlarını Gösterir.',
        });
    }

async run(msg) {

  var request = require('request');
  request('https://www.doviz.com/api/v1/currencies/USD/latest', function (error, response, body)
  {
    if (error) return console.log('Hata:', error);
    else if (!error)
    {
      var dolar = JSON.parse(body);
      request('https://www.doviz.com/api/v1/currencies/EUR/latest', function (error, response, body)
      {
        if (error) return console.log('Hata:', error); 
        else if (!error)
        {
        var euro = JSON.parse(body);

        let GuildEmbed = new MessageEmbed()
          .setColor('0x36393F')
          .setTitle("Dolar / Euro Döviz Kurları")
          .addField("Dolar ($)", `**Alış:** ${dolar.buying} \n**Satış:** ${dolar.selling}`)
          .addField("Euro (€)", `**Alış:** ${euro.buying} \n**Satış:** ${euro.selling}`)
          // .setFooter(`Saat: ${Zaman} | Gün: ${Tarih}`)
          .setFooter(moment().tz('Europe/Istanbul').format('[Saat:] HH.mm [| Gün:] DD.MM.YYYY'))
        msg.channel.send(GuildEmbed);
        }})
    }})
}
}