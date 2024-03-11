const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

const moment = require('moment')
require('moment-timezone')

module.exports = class BilgiCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'bilgi',
            aliases: ['info', 'i', 'bot-info', 'bot-bilgi'],
            group: 'bilgi',
            memberName: 'bilgi',
            description: 'Botun Bilgilerini Gösterir.',
        });
    }

async run(msg) {

  const embed = new MessageEmbed()
      .addField("Bot Sahipleri", `<@371655928170414080> - <@307222934928359426>`)
      .addField("Toplam Sunucu Sayısı", this.client.guilds.size, true)
      .addField("Toplam Kullanıcı Sayısı", this.client.users.size, true)
      .addField("Toplam Kanal Sayısı", this.client.channels.size, true)
      .addField("Versiyon", "v0.0.1", true)
      .addField("YouTube", "[xxxxx](https://www.youtube.com/xxxxx)", true)
      .addField("Kitaplık Türü", "discord.js-commando", true)
      .addField("Bağlantılar",
                "[Bot Davet](https://discordapp.com/oauth2/authorize?client_id=453610237610688512&scope=bot&permissions=2146958591)"
                + "\n" +
                "[Web Site](https://fairycanarybot.cf/)"
                + "\n" +
                "[Destek Sunucusu](https://discord.gg/a5rBPCJ)"
                , true)
      .addField("Kodlama Dili", "JavaScript", true)
      .setColor('0x36393F')
  return msg.channel.send(embed);
}
}