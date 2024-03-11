const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

const Cleverbot = require('cleverbot.io');

module.exports = class KonuşCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'konuş',
            aliases: ['cleverbot', 'clbot', 'cl', 'sor'],
            group: 'eğlence',
            memberName: 'konuş',
            description: 'Botla Sohbet Edersin.',
            throttling: {
              usages: 5,
              duration: 7
            },
            args: [
              {
                  key: 'soru',
                  prompt: 'Botla konuşmak istediğiniz şeyi yazın.',
                  type: 'string',
              }
            ]
        });
    }

async run(msg, args) {

  let clbot = new Cleverbot(process.env.CLBOT_API_USER, process.env.CLBOT_API_KEY);
  clbot.setNick('Fairy Canary');

  msg.channel.send('*Cevap yükleniyor* <a:yukleniyor:525085912552439808>')
  clbot.create(function (err, session) {
    clbot.ask(args.soru, function (err, response) {
      msg.edit(response)
    })
  })
}
}