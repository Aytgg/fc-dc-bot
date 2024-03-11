const { MessageEmbed, MessageAttachment } = require('discord.js');

const Canvas = require('canvas');
const snekfetch = require('snekfetch');

module.exports = async (member) => {
  let ModLogKanalı = member.guild.settings.get('ModLogKanalı');
  let ResimliGiriş = member.guild.settings.get('ResimliGiriş');
  let ResimliGirişÇıkışArkaplanı = member.guild.settings.get('ResimliGirişÇıkışArkaplanı');
  if (!ResimliGiriş) return;
  let ResimliGirişÇıkışKanalı = member.guild.channels.cache.get(member.guild.settings.get('ResimliGirişÇıkışKanalı'));
  if (!ResimliGirişÇıkışKanalı) return;
  if (ResimliGirişÇıkışArkaplanı == 'Manzara') return;

  const canvas = Canvas.createCanvas(1500, 417);
  const ctx = canvas.getContext('2d');

  const {body: downloadedImageBuffer} = await snekfetch.get('https://cdn.discordapp.com/attachments/450693709076365323/473184546477572107/guildRemove.png');
  const template = await Canvas.loadImage( downloadedImageBuffer );
  ctx.drawImage(template, 0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'white';
  const { body: buffer } = await snekfetch.get(member.user.displayAvatarURL({ format: 'png' }));
  const avatar = await Canvas.loadImage(buffer);
  ctx.drawImage(avatar, 43, 26, 362, 362);

  ctx.fillStyle = '#cc0000';
  ctx.fillRect(0, 0, 15, canvas.height);

  ctx.fillStyle = 'white'
  if (member.user.tag.length < 15) {
    ctx.font = '128px sans-serif'
    ctx.fillText(member.user.tag, 430, 298);
  }
  if (member.user.tag.length >= 15) {
    ctx.font = '64px sans-serif'
    ctx.fillText(member.user.tag, 430, 234);
  }

  const attachment = new MessageAttachment(canvas.toBuffer(), 'gorusuruz.png');

  ResimliGirişÇıkışKanalı.send(attachment);
}