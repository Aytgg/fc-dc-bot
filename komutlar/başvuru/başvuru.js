const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

const moment = require('moment');
require('moment-timezone')

module.exports = class BaşvuruCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'başvuru',
            aliases: ['başvuru-yap'],
            group: 'başvuru',
            memberName: 'başvuru',
            description: 'Başvuru Yapmanızı Sağlar.',
            guildOnly: true,
            throttling: {
              usages: 3,
              duration: 5
            },
            args: [
                {
                    key: 'yaş',
                    prompt: 'Kaç yaşındasın ?',
                    type: 'integer',
                },
                {
                    key: 'yetkili',
                    prompt: 'Daha önce herhangi bir sunucuda yetkili olarak görev yaptın mı ? `<-/+>`',
                    type: 'boolean',
                },
                {
                    key: 'aktiflik',
                    prompt: 'Aktif olduğun saat aralığı nedir ?',
                    type: 'string',
                },
                {
                    key: 'hakkında',
                    prompt: 'Hakkınızda kısa bilgi verin.',
                    type: 'string',
                },
                {
                    key: 'neden',
                    prompt: 'Niçin başkasının yerine siz?',
                    type: 'string',
                },
            ]
        });    
    }
    
async run(msg, args) {

  const BaşvuruKanalı = msg.guild.channels.get(msg.guild.settings.get('BaşvuruKanalı'));
  if (!BaşvuruKanalı) return msg.reply('Başvuru kanalı ayarlanmadığından başvuru sistemi devre dışıdır. Başvuru kanalını ayarlamak için `' + msg.guild.commandPrefix + 'başvuru-kanal-ayarla` komutunu kullanabilirsiniz.');

  let embed = new MessageEmbed()
    .setColor('0x36393F')
    .setDescription('<:dogru:506200517249204239> Başvurunuz Gönderildi')
    .setTimestamp()
  msg.channel.send(embed)

  const embed1 = new MessageEmbed()
    .setDescription('<:pdf:506200567039918090> ' + msg.author.username)   
    .setColor('0x36393F')
    .setThumbnail(msg.author.displayAvatarURL({ format: 'png' }))
    .addField('**<:yesilOk:506233976550326284> Kullanıcı:**', msg.author.tag)
    .addField('**<:yesilOk:506233976550326284> Kullanıcı ID:**', msg.author.id)
    .addField('**<:yesilOk:506233976550326284> Hesap Kuruluşu:**', moment(msg.author.createdAt).locale('tr').tz('Europe/Istanbul').format('dddd, Do MMMM YYYY, HH.mm.ss'))

    .addField('**<:yesilOk:506233976550326284> Yaşı:**', args.yaş)
    .addField('**<:yesilOk:506233976550326284> Yetkili Olarak Görev Yaptı mı?**', args.yetkili)
    .addField('**<:yesilOk:506233976550326284> Aktif Olduğu Saat Aralığı:**', args.aktiflik)
    .addField('**<:yesilOk:506233976550326284> Hakkında:**', args.hakkında)
    .addField('**<:yesilOk:506233976550326284> Neden o?**', args.neden)

    .setFooter('Başvuru Sistemi | Başvuru Formu', msg.author.displayAvatarURL({ format: 'png' }))
    .setTimestamp()
  return BaşvuruKanalı.send(embed1);
}
}