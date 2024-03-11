const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

const superagent = require("superagent");

module.exports = class BesleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'besle',
            aliases: ['feed'],
            group: 'eğlence',
            memberName: 'besle',
            description: 'Bahsedilen Kişiyi Beslemenizi Sağlar.',
            guildOnly: true,
            throttling: {
              usages: 3,
              duration: 5
            },
            args: [
              {
                  key: 'kişi',
                  prompt: 'Beslemek istediğiniz kişiyi seçin.',
                  type: 'user',
              }
            ]
        });
    }

async run(msg, args) {

    if (args.kişi.id == msg.author.id) return msg.reply(':negative_squared_cross_mark: `Kendini besleyecek kadar yalnız mısın ?` :sweat:')

    const {body} = await superagent.get(`https://nekos.life/api/v2/img/feed`);

    let embed = new MessageEmbed()
      .setTitle('Besleme Vakası !')
      .setDescription(`**${msg.author.username}, ${args.kişi.username}** Kişisini Besledi !`)
      .setImage(body.url)
      .setColor('0x36393F')
    msg.channel.send(embed)
}
}