const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

const math = require('math-expression-evaluator');

module.exports = class HesaplaCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hesapla',
            aliases: ['math', 'maths', 'matematiksorusu', 'matematikişlemi', 'matematikhesapla', 'mat', 'mathesapla', 'işlem', 'dörtişlem', '4işlem'],
            group: 'bilgi',
            memberName: 'hesapla',
            description: 'Yazılan Matematik İşleminin Sonucu Gösterir.',
            args: [
                {
                    key: 'işlem',
                    prompt: 'Matematik işlemi yazın.',
                    type: 'string'
                }
            ]
        });
    }

async run(msg, args) {

  let cevap;
  try {
    cevap = math.eval(args.işlem);
  } catch(err) {
    return msg.channel.send('Hatalı İşlem');
  }

  let embed = new MessageEmbed()
    .setColor('0x36393F')
    .addField('İşlem', args.işlem)
    .addField('Cevap', cevap)
  msg.channel.send(embed)
}
}