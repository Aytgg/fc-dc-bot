const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class McSkinCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'mc-skin',
            aliases: ['mc-skini', 'minecraft-skin', 'minecraft-skini'],
            group: 'eğlence',
            memberName: 'mc-skin',
            description: 'Seçilen Kullanıcının Skinini Gösterir.',
            throttling: {
              usages: 3,
              duration: 5
            },
            args: [
              {
                  key: 'kullanıcı',
                  prompt: 'Skinini görmek istediğiniz kullanıcıyı seçin.',
                  type: 'string'
              }
            ]
        });
    }

async run(msg, args) {

  var embed = new MessageEmbed()
    .setTitle(`**${args.kullanıcı}** Kullanıcısının Skini`)
    .setImage(`https://minotar.net/armor/body/${args.kullanıcı}/300.png`)
    .setFooter(`${msg.author.tag} Tarafından İstendi.`, msg.author.displayAvatarURL())
    .setColor('0x36393F');
  return msg.channel.send(embed)
}
}