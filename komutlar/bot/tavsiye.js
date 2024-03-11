const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class TavsiyeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'tavsiye',
            aliases: ['tavsiye-ver', 'tavsiye-et'],
            group: 'bot',
            memberName: 'tavsiye',
            description: 'Bot Sahibine Tavsiye Vermenizi Sağlar.',
            args: [
                {
                    key: 'tavsiye',
                    prompt: 'Bot sahibine vermek istediğin tavsiyeyi yazın.',
                    type: 'string'
                }
            ]
        });
    }

async run(msg, args) {

  const embed = new MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`${msg.author.tag}, Tavsiyeniz gönderildi!`)
  msg.channel.send(embed);


  let str = '<@371655928170414080>'; // Aysu
  let str2 = '<@307222934928359426>'; // Aytuğ
  let str3 = '<@377508258102902784>'; // Kadir
  let id = str.replace(/[<@!>]/g, '');
  let id2 = str2.replace(/[<@!>]/g, '');
  let id3 = str3.replace(/[<@!>]/g, '');

  const embed1 = new MessageEmbed()
    .setColor('0x36393F')
    .setTitle(`**${msg.author.tag}** Tavsiyesi`)
    .addField('» Kulanıcı', '**İsim:** ' + msg.author.tag + '\n**ID:** ' + msg.author.id)
    .addField('» Tavsiye', args.tavsiye)
    .setThumbnail(msg.author.displayAvatarURL({ format: 'png' }))
    .setTimestamp()
  this.client.users.fetch(id)
  .then(user => (user.send(embed1)))
  this.client.users.fetch(id2)
  .then(user => (user.send(embed1)))
  this.client.users.fetch(id3)
  .then(user => (user.send(embed1)))
}
}