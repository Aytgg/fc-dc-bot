const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

const superagent = require("superagent");

module.exports = class SarılCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'sarıl',
            aliases: ['hug'],
            group: 'eğlence',
            memberName: 'sarıl',
            description: 'Bahsedilen Kişiye Sarılmanızı Sağlar.',
            guildOnly: true,
            throttling: {
              usages: 3,
              duration: 5
            },
            args: [
              {
                  key: 'kişi',
                  prompt: 'Sarılmak istediğiniz kişiyi seçin.',
                  type: 'user',
              }
            ]
        });
    }

async run(msg, args) {

    if (args.kişi.id == msg.author.id) return msg.reply(':negative_squared_cross_mark: `Kendine sarılacak kadar yalnız mısın ?` :sweat:')

    const {body} = await superagent.get(`https://nekos.life/api/v2/img/hug`);

    let embed = new MessageEmbed()
      .setTitle('Sarılma Vakası !')
      .setDescription(`**${msg.author.username}, ${args.kişi.username}** Kişisine Sarıldı !`)
      .setImage(body.url)
      .setColor('0x36393F')
    msg.channel.send(embed)
}
}