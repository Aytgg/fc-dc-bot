const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class KayıtCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kayıt',
            aliases: ['kayıt1', 'kayıt2', 'kayıt3'],
            group: 'kayıt',
            memberName: 'kayıt',
            description: 'Kullanıcıyı Kayıt Etmenizi Sağlar.',
            guildOnly: true,
            userPermissions: ['ADMINISTRATOR'],
            args: [
              {
                  key: 'kullanıcı',
                  prompt: 'Kayıt etmek istediğiniz kullanıcıyı etiketleyin.',
                  type: 'member'
              },
              {
                  key: 'isim',
                  prompt: 'Kayıt etmek istediğiniz kullanıcının ismini yazın.',
                  type: 'string'
              },
              {
                  key: 'yaş',
                  prompt: 'Kayıt etmek istediğiniz kullanıcın yaşını yazın.',
                  type: 'integer'
              },
              {
                  key: 'cinsiyet',
                  prompt: 'Kayıt etmek istediğiniz kullanıcının cinsiyetini seçin.',
                  type: 'string'
              }
            ]
        });
    }

hasPermission(msg)
{
  let kayıtçıRolü = msg.guild.settings.get('KayıtçıRolü');
  if(!msg.guild.roles.get(kayıtçıRolü)) return msg.reply(':negative_squared_cross_mark: Kayıt sistemini kullanabilmek için öncelikle kayıtçı rolü ayarlanmış olmalı.');

  if (msg.member.hasPermission('ADMINISTRATOR') || msg.member.roles.has(kayıtçıRolü)) return true;
}

async run(msg, args) {

  msg.delete()

  let kayıtsızÜyeRolüID = msg.guild.settings.get('KayıtsızÜyeRolü');
  if(!kayıtsızÜyeRolüID) return msg.reply(':negative_squared_cross_mark: Kayıt sistemini kullanabilmek için öncelikle kayıtsız üye rolü ayarlanmış olmalı.');
  let kayıtsızÜyeRolü = msg.guild.roles.get(kayıtsızÜyeRolüID);

  let erkekÜyeRolüID = msg.guild.settings.get('ErkekÜyeRolü');
  if(!erkekÜyeRolüID) return msg.reply(':negative_squared_cross_mark: Kayıt sistemini kullanabilmek için öncelikle erkek üye rolü ayarlanmış olmalı.');
  let erkekÜyeRolü = msg.guild.roles.get(erkekÜyeRolüID);
  let teyitsizÜyeRolüID = msg.guild.settings.get('TeyitsizÜyeRolü');
  if(!teyitsizÜyeRolüID) return msg.reply(':negative_squared_cross_mark: Kayıt sistemini kullanabilmek için öncelikle teyitsiz rolü ayarlanmış olmalı.');
  let teyitsizÜyeRolü = msg.guild.roles.get(teyitsizÜyeRolüID);
  let kadınÜyeRolüID = msg.guild.settings.get('KadınÜyeRolü');
  if(!kadınÜyeRolüID) return msg.reply(':negative_squared_cross_mark: Kayıt sistemini kullanabilmek için öncelikle kadın rolü ayarlanmış olmalı.');
  let kadınÜyeRolü = msg.guild.roles.get(kadınÜyeRolüID);

  let ModLogKanalıID = msg.guild.settings.get('ModLogKanalı');
  let ModLogKanalı = msg.guild.channels.get(ModLogKanalıID);

  let embed = new MessageEmbed()
    .setAuthor(args.kullanıcı.user.username, args.kullanıcı.user.displayAvatarURL({ format: 'png' }))
    .setColor('0x36393F')
    .setDescription('Kullanıcı Kayıt Edildi')
    .addField('Kullanıcı:', args.kullanıcı)
    .setTimestamp();

  let embed1 = new MessageEmbed()
    .setAuthor(args.kullanıcı.user.username, args.kullanıcı.user.displayAvatarURL({ format: 'png' }))
    .setColor('0x36393F')
    .setDescription('Kayıt Edildin')
    .addField('Kayıt Edildiğin Sunucu:', args.kullanıcı.guild.name)
    .setTimestamp();

  {
    await args.kullanıcı.setNickname(args.isim.charAt(0).toUpperCase() + args.isim.slice(1).toLowerCase() + ' [' + args.yaş + ']');
    await args.kullanıcı.roles.remove(kayıtsızÜyeRolü);
  }

  if (['erkek', 'e', 'erk'].includes(args.cinsiyet))
  {
    await args.kullanıcı.roles.add(erkekÜyeRolü);

    embed.addField('Değiştirilen Rol:', '<@&' + kayıtsızÜyeRolü + '> >> <@&' + erkekÜyeRolü + '>');
    if (ModLogKanalıID) ModLogKanalı.send(embed);

    embed1.addField('Değiştirilen Rolün:', '**' + kayıtsızÜyeRolü.name + '** >> **' + erkekÜyeRolü.name + '**');
    args.kullanıcı.user.send(embed1);
  }

  if (["teyitsiz", "t", "teyitsizkadın", "teyitsizbayan", "teyitsizkız", "teyit", "tk", "tb"].includes(args.cinsiyet))
  {
    await args.kullanıcı.roles.add(teyitsizÜyeRolü);

    embed.addField('Değiştirilen Rol:', '<@&' + kayıtsızÜyeRolü + '> >> <@&' + teyitsizÜyeRolü + '>');
    if (ModLogKanalıID) ModLogKanalı.send(embed);

    embed1.addField('Değiştirilen Rolün:', '**' + kayıtsızÜyeRolü.name + '** >> **' + teyitsizÜyeRolü.name + '**');
    args.kullanıcı.send(embed1);
  }

  if (["kadın", "k", "bayan", "b", "kız"].includes(args.cinsiyet))
  {
    await args.kullanıcı.roles.add(kadınÜyeRolü);

    embed.addField('Değiştirilen Rol:', '<@&' + kayıtsızÜyeRolü + '> >> <@&' + kadınÜyeRolü + '>');
    if (ModLogKanalıID) ModLogKanalı.send(embed);

    embed1.addField('Değiştirilen Rolün:', '**' + kayıtsızÜyeRolü.name + '** >> **' + kadınÜyeRolü.name + '**');
    args.kullanıcı.send(embed1);
  }
}
}