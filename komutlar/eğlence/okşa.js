const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

const superagent = require("superagent");

module.exports = class OkşaCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'okşa',
            aliases: ['pat'],
            group: 'eğlence',
            memberName: 'okşa',
            description: 'Bahsedilen Kişiyi Okşamanızı Sağlar.',
            guildOnly: true,
            throttling: {
              usages: 3,
              duration: 5
            },
            args: [
              {
                  key: 'kişi',
                  prompt: 'Okşamak istediğiniz kişiyi seçin.',
                  type: 'user',
              }
            ]
        });
    }

async run(msg, args) {

    if (args.kişi.id == msg.author.id) return msg.reply(':negative_squared_cross_mark: `Kendini okşayacak kadar yalnız mısın ?` :sweat:')

    const {body} = await superagent.get(`https://nekos.life/api/v2/img/pat`);

    let embed = new MessageEmbed()
      .setTitle('Okşama Vakası !')
      .setDescription(`**${msg.author.username}, ${args.kişi.username}** Kişisini Okşadı !`)
      .setImage(body.url)
      .setColor('0x36393F')
    msg.channel.send(embed)
}
}