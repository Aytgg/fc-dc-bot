const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

const request = require('request');

module.exports = class YavaşModCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'yavaşmod',
            aliases: ['slowmode'],
            group: 'yetkili',
            memberName: 'yavaşmod',
            description: 'Kaç Saniyede Bir Mesaj Gönderileceğini Ayarlar.',
            guildOnly: true,
            userPermissions: ['ADMINISTRATOR'],
            args: [
                {
                    key: 'limit',
                    prompt: 'Yavaş modun kaç saniyeye ayarlanacağını yazın.',
                    type: 'string'
                },
            ]
        });
    }

async run(msg, args) {

  if (msg.channel.type !== "text") return;

  let embed = new MessageEmbed()
    .setDescription('Yazma süre limiti **' + args.limit + '** saniye olarak ayarlanmıştır.')
    .setColor('0x36393F')
  msg.channel.send(embed)

  request({
    url: 'https://discordapp.com/api/v7/channels/' + msg.channel.id,
    method: 'PATCH',
    json: {
        rate_limit_per_user: args.limit
    },
    headers: {
        "Authorization": 'Bot ' + process.env.BOT_TOKEN
    }
})
}
}