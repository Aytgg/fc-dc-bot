const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

const moment = require('moment');
const ms = require('ms')

module.exports = class ÇekilişCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'çekiliş',
            aliases: ['çekiliş-yap'],
            group: 'çekiliş',
            memberName: 'çekiliş',
            description: 'Çekiliş Başlatır.',
            guildOnly: true,
            throttling: {
              usages: 3,
              duration: 5
            },
            args: [
              {
                  key: 'süre',
                  prompt: 'Çekilişin ne kadar süreceğini yazın.',
                  type: 'string',
                  validate: (value, msg, arg) => {
                    let lc = value.toLowerCase()
                    if (lc.match(/[1-60][s,m,h,d,w]/g)) return true;
                  }
              },
              {
                  key: 'ödül',
                  prompt: 'Çekiliş ödülünü yazın.',
                  type: 'string'
              }
            ]
        });
    }

async run(msg, args) {

  let ÇekilişKanalı = msg.guild.channels.get(msg.guild.settings.get('ÇekilişKanalı'));
  if (!ÇekilişKanalı) return msg.reply('Çekiliş kanalı ayarlanmadığından çekiliş sistemi devre dışıdır. Çekiliş kanalını ayarlamak için `' + msg.guild.commandPrefix + 'çekiliş-kanal-ayarla` komutunu kullanabilirsiniz.');

  let zaman = moment().format('Do MMMM YYYY , hh:mm');

  try {
    let embed = new MessageEmbed()
        .setColor('0x36393F')
        .setTitle('*' + args.ödül + '*')
        .setDescription('🎉 Emojisine Tıklayarak Katılabilirsin')
        .addField('Çekilişi Yapan', '<@' + msg.author.id + '>' +
                  '\n**Başlangıç Zamanı**')
        .setTimestamp()
    ÇekilişKanalı.send('🎉 *Devam Eden Çekiliş* 🎉' , embed).then(m => {
      let react = m.react('🎉');
      setTimeout(() => {
        let katılanlarVeBot = m.reactions.get("🎉").users;
        let katılanlar = katılanlarVeBot.array().filter(u => u.id !== msg.author.id && !u.bot);
        let kazanan = katılanlar[Math.floor(Math.random() * katılanlar.length) + 0]
        let embed1 = new MessageEmbed()
            .setAuthor(msg.author.username, msg.author.displayAvatarURL({ format: 'png' }))
            .setTitle(args.ödül)
            .setColor('0x36393F')
            .setDescription('Çekiliş Bitti 🎉', )
            if (kazanan !== undefined) embed1.addField('Kazanan', '<@' + kazanan + '>' +
                                                       '\n**Bitiş Zamanı**')
            else embed1.addField('Kazanan', 'Çekilişe kimse katılmadığından kazanan yok :sweat:' +
                                 '\n**Bitiş Zamanı**')
            .setTimestamp()
        m.edit('*🎉 Çekiliş Bitti 🎉*' , embed1);
        var embed2 = new MessageEmbed()
            .setColor('0x36393F')
            .setDescription("Ödülünüzü destek talebi açarak talep edebilirsiniz.")
        if (kazanan !== undefined) ÇekilişKanalı.send('*Tebrikler <@' + kazanan + '>, `' + args.ödül + '` kazandınız.*' , embed2)
      }, ms(args.süre));
    });
  } catch(err) {
    msg.channel.send('HATA | ' + err);
    console.log(err);
  }
}
}