/*const { Command } = require('discord.js-commando');
const { MessageAttachment } = require('discord.js');

const Canvas = require('canvas');
const snekfetch = require('snekfetch');

module.exports = class AşkÖlçerCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'aşk-ölçer',
            aliases: ['love-meter', 'aşk', 'aşk-yüzde', 'love', 'love-percentage'],
            group: 'eğlence',
            memberName: 'aşk-ölçer',
            description: 'Bahsedilen Kişi İle Aranızdaki Aşk Yüzdesini Gösterir.',
            guildOnly: true,
            throttling: {
              usages: 3,
              duration: 5
            },
            args: [
              {
                  key: 'kişi',
                  prompt: 'Aranızdaki aşk yüzdesini öğrenmek istediğiniz kişiyi seçin.',
                  type: 'user'
              }
            ]
        });
    }

async run(msg, args) {

  const canvas = Canvas.createCanvas(310, 160);
  const ctx = canvas.getContext('2d');

  const {body: downloadedImageBuffer} = await snekfetch.get('https://cdn.glitch.com/eaf5e667-49aa-46e2-a69e-6b392fbb476b%2Fa%C5%9FkolcerBosArkaplan.png?1531641809728');
  const background = await Canvas.loadImage( downloadedImageBuffer );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = '#74037b';
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  //ctx.beginPath();
  //ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
  //ctx.closePath();
  //ctx.clip();

  const { body: buffer } = await snekfetch.get(msg.author.displayAvatarURL({ format: 'png' }));
  const avatar = await Canvas.loadImage(buffer);
  ctx.drawImage(avatar, 28, 28, 60, 60);

  const { body: mentionedBuffer } = await snekfetch.get(args.kişi.displayAvatarURL({ format: 'png' }));
  const mentionedAvatar = await Canvas.loadImage(mentionedBuffer);
  ctx.drawImage(mentionedAvatar, 224, 28, 60, 60);

  let aşkyüzdesi = Math.floor(Math.random() * 100) + 1;//Math.round(Math.random());

  ctx.fillStyle = 'red';
  ctx.fillRect(58, 115, aşkyüzdesi / 100 * 197, 26);

  ctx.fillStyle = 'black'
  ctx.font = '20px serif';
  ctx.fillText(`${aşkyüzdesi}%`, 137, 137, 37);

  const attachment = new MessageAttachment(canvas.toBuffer(), 'askolcerArkaplan.png');

  msg.channel.send(`<@${msg.author.id}> İle <@${args.kişi.id}> Arasındaki Aşk Yüzdesi ${aşkyüzdesi}% !`, attachment);
}
}*/