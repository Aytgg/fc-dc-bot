const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class OylamaCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'oylama',
            aliases: ['vote', 'oylama-aç', 'oylama-yap', 'anket', 'anket-aç', 'anket-yap'],
            group: 'altyetkili',
            memberName: 'oylama',
            description: 'Oylama Başlatır.',
            throttling: {
              usages: 3,
              duration: 5
            },
            guildOnly: true,
            args: [
                {
                    key: 'soru',
                    prompt: 'Oylamak istediğiniz şeyi yazın.',
                    type: 'string',
                }
            ]
        });
    }

async run(msg, args) {

  const embed = new MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(msg.author.username, msg.author.displayAvatarURL())
    .setThumbnail('https://www.noktalamaisaretleri.com/images/soru-isareti.jpg')
    .setTitle('Oylama')
    .setDescription(args.soru)
    .setTimestamp()
  msg.channel.send(embed).then(async msg => {

  let YanlışEmoji = this.client.emojis.get('506200517031231492')
  let DoğruEmoji = this.client.emojis.get('506200517249204239')

  await msg.react(YanlışEmoji)
  msg.react(DoğruEmoji)
  });
}
}