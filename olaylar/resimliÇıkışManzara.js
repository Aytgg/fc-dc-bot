const { MessageEmbed, MessageAttachment } = require('discord.js');

const Canvas = require('canvas');
const snekfetch = require('snekfetch');

module.exports = async (member) => {
  let ModLogKanalı = member.guild.settings.get('ModLogKanalı');
  let ResimliÇıkış = member.guild.settings.get('ResimliÇıkış');
  let ResimliGirişÇıkışArkaplanı = member.guild.settings.get('ResimliGirişÇıkışArkaplanı');
  if (!ResimliÇıkış) return;
  let ResimliGirişÇıkışKanalı = member.guild.channels.cache.get(member.guild.settings.get('ResimliGirişÇıkışKanalı'));
  if (!ResimliGirişÇıkışKanalı) return;
  if (ResimliGirişÇıkışArkaplanı !== 'Manzara') return;

  const canvas = Canvas.createCanvas(640, 400);
  const ctx = canvas.getContext('2d');

  const {body: downloadedImageBuffer} = await snekfetch.get('https://cdn.discordapp.com/attachments/469189277675159553/565695014538313738/guildRemoveManzara.png');
  const template = await Canvas.loadImage( downloadedImageBuffer );
  ctx.drawImage(template, 0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#cc0000';
  ctx.fillRect(0, 0, 3, canvas.height);

  ctx.fillStyle = 'white'
  ctx.textAlign = 'center'
  if (member.user.username.length < 15) {
    ctx.font = 'bold 64px sans-serif'
    ctx.fillText(member.user.username, 320, 334);
  }
  if (member.user.username.length >= 15) {
    ctx.font = 'bold 32px sans-serif'
    ctx.fillText(member.user.username, 220, 318);
  }

  ctx.beginPath();
  ctx.arc(320, 150, 100, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();

  ctx.fillStyle = 'white';
  const { body: buffer } = await snekfetch.get(member.user.displayAvatarURL({ format: 'png' }));
  const avatar = await Canvas.loadImage(buffer);
  ctx.drawImage(avatar, 220, 50, 200, 200);

  const attachment = new MessageAttachment(canvas.toBuffer(), 'hosgeldin.png');

  ResimliGirişÇıkışKanalı.send(attachment);
}