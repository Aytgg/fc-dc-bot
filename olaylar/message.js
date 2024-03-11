const { MessageEmbed } = require('discord.js');
const fs = require ('fs');

module.exports = async msg => {
  const bot = msg.client;

  let GuildID = "372754953170845696";

  let AysuID = "371655928170414080";
  let AytuğID = "307222934928359426";

  if (msg.author.bot) return;
  const dmKanalı = msg.client.channels.fetch('487325850140934166');
  if (msg.channel.type == 'dm') {
    console.log(msg.author.tag + ': ' + msg.content)

    let embed = new MessageEmbed()
      .setColor(3447003)
      .setTitle("Yazan: " + msg.author.tag)
      .setDescription(msg.content)
      .setFooter(msg.author.id)
    dmKanalı.send(embed)
  }

  if (msg.guild) {
    if (msg.member.hasPermission('MANAGE_MESSAGES')) return;

    if (msg.guild.settings.get('KüfürFiltresi')) {

    const kufur = ["amk", "amq", "mq", "aq", "orospu", "orspu", "oç", "piç", "yarrak", "sik", "anan", "pezevenk", "pezo", "a.q", "o.ç", "a.m.k", "m.q", "m.k", "p.i.ç", "0ç", "0.ç"];
    if (kufur.some(word => msg.content.toLowerCase().includes(word.toLowerCase()))) {
      try {
        msg.delete();

        msg.channel.send('https://www.youtube.com/watch?v=iRAobOG-7LY')
        .then(m => m.delete({ timeout: 20000 }))

        msg.reply(`Küfür Etme :rage: (*Video Küfür İçerir.*)`)
        .then(m => m.delete({ timeout: 20000 }))
      } catch(err) {
        console.log(err);
      }
    }
    }

    if (msg.guild.settings.get('ReklamFiltresi'))
    {

    const reklam = ["discordapp", "discord.gg", "discord.tk", "discordbots.org", "https://discordapp.com", "https://discord.gg", "http://discord.gg", "htpp:/discordapp.com", "https://discordbots.org"];
    if (reklam.some(word => msg.content.toLowerCase().includes(word.toLowerCase()))) {
      try {
        msg.delete();

        msg.reply(`Reklam Yapma :rage:`)
        .then(m => m.delete({ timeout: 4000 }))
      } catch(err) {
        console.log(err);
      }
    }
    }

    if (msg.guild.settings.get('LinkFiltresi'))
    {

    const link = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "http", ".gl", ".org", ".biz", ".net", ".rf.gd", ".az", ".party"];
    if (link.some(word => msg.content.toLowerCase().includes(word.toLowerCase()))) {
      try {
        msg.delete();

        msg.reply(`Link Paylaşma :rage:`)
        .then(m => m.delete({ timeout: 4000 }))
      } catch(err) {
        console.log(err);
      }
    }
    }
  }
}