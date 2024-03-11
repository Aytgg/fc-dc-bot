const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class FiltrelerCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'filtreler',
            aliases: ['filtre', 'engelleyici', 'engelleyiciler', 'blocker', 'blockers', 'koruma', 'korumalar'],
            group: 'sunucu',
            memberName: 'filtreler',
            description: 'Sunucudaki Filtreleri Açıp Kapatmanızı Sağlar.',
            guildOnly: true,
            userPermissions: ['ADMINISTRATOR'],
            args: [
              {
                  key: 'filtre',
                  prompt: 'Kapatıp açmak istediğiniz filtreyi seçin. (Küfür / Reklam / Link)',
                  type: 'string',
                  validate: (value, msg, arg) => {
                    let lc = value.toLowerCase()
                    if (lc == 'küfür' || lc == 'küfürler' || lc == 'küfürfiltresi' || lc == 'küfürengelleyici') return true;
                    else if (lc == 'reklam' || lc == 'reklamlar' || lc == 'reklamfiltresi' || lc == 'reklamengelleyici') return true;
                    else if (lc == 'link' || lc == 'linkler' || lc == 'linkfiltresi' || lc == 'linkengelleyici') return true;
                    else return 'Kapatıp açmak istediğiniz filtreyi seçin. (Küfür / Reklam / Link)';
                  }
              }
            ]
        });
    }

async run(msg, args) {

  if (args.filtre == 'küfür' || args.filtre == 'küfürler' || args.filtre == 'küfürfiltresi' || args.filtre == 'küfürengelleyici')
  {
    if (msg.guild.settings.get('KüfürFiltresi'))
    {
    msg.guild.settings.remove('KüfürFiltresi');

    let embed = new MessageEmbed()
      .setColor('0x36393F')
      .setDescription('<:dogru:506200517249204239> Küfür Filtresi Kapatıldı.')
      .setTimestamp()
    return msg.channel.send(embed)
    }
    if (!msg.guild.settings.get('KüfürFiltresi'))
    {
    msg.guild.settings.set('KüfürFiltresi', true);

    let embed = new MessageEmbed()
      .setColor('0x36393F')
      .setDescription('<:dogru:506200517249204239> Küfür Filtresi Açıldı.')
      .setTimestamp()
    return msg.channel.send(embed)
    }
  }

  if (args.filtre == 'reklam' || args.filtre == 'reklamlar' || args.filtre == 'reklamfiltresi' || args.filtre == 'reklamengelleyici')
  {
    if (msg.guild.settings.get('ReklamFiltresi'))
    {
    msg.guild.settings.remove('ReklamFiltresi');

    let embed = new MessageEmbed()
      .setColor('0x36393F')
      .setDescription('<:dogru:506200517249204239> Reklam Filtresi Kapatıldı.')
      .setTimestamp()
    return msg.channel.send(embed)
    }
    if (!msg.guild.settings.get('ReklamFiltresi'))
    {
    msg.guild.settings.set('ReklamFiltresi', true);

    let embed = new MessageEmbed()
      .setColor('0x36393F')
      .setDescription('<:dogru:506200517249204239> Reklam Filtresi Açıldı.')
      .setTimestamp()
    return msg.channel.send(embed)
    }
  }

  if (args.filtre == 'link' || args.filtre == 'linkler' || args.filtre == 'linkfiltresi' || args.filtre == 'linkengelleyici')
  {
    if (msg.guild.settings.get('LinkFiltresi'))
    {
    msg.guild.settings.remove('LinkFiltresi');

    let embed = new MessageEmbed()
      .setColor('0x36393F')
      .setDescription('<:dogru:506200517249204239> Link Filtresi Kapatıldı.')
      .setTimestamp()
    return msg.channel.send(embed)
    }
    if (!msg.guild.settings.get('LinkFiltresi'))
    {
    msg.guild.settings.set('LinkFiltresi', true);

    let embed = new MessageEmbed()
      .setColor('0x36393F')
      .setDescription('<:dogru:506200517249204239> Link Filtresi Açıldı.')
      .setTimestamp()
    return msg.channel.send(embed)
    }
  }
}
}