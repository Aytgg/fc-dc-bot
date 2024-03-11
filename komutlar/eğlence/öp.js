const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

const superagent = require("superagent");

module.exports = class ÖpCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'öp',
            aliases: ['kiss'],
            group: 'eğlence',
            memberName: 'öp',
            description: 'Bahsedilen Kişiyi Öpmenizi Sağlar.',
            guildOnly: true,
            throttling: {
              usages: 3,
              duration: 5
            },
            args: [
              {
                  key: 'kişi',
                  prompt: 'Öpmek istediğiniz kişiyi seçin.',
                  type: 'user',
              }
            ]
        });
    }

async run(msg, args) {

    if (args.kişi.id == msg.author.id) return msg.reply(':negative_squared_cross_mark: `Kendini öpecek kadar yalnız mısın ?` :sweat:')

    const {body} = await superagent.get(`https://nekos.life/api/kiss`);

    let embed = new MessageEmbed()
      .setTitle('Öpme Vakası !')
      .setDescription(`**${msg.author.username}, ${args.kişi.username}** Kişisini Öptü !`)
      .setImage(body.url)
      .setColor('0x36393F')
    msg.channel.send(embed)
}
}