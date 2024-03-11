const { Command } = require('discord.js-commando');
const { MessageEmbed, Util } = require('discord.js');

module.exports = class DurdurCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'durdur',
            aliases: ['stop', 'bitir', 'kapat', 'şarkı-durdur', 'şarkı-bitir', 'şarkı-kapat', 'müzik-durdur', 'müzik-kapat', 'müzik-kapat', 'stop-song', 'finish-song', 'stop-music', 'finish-music'],
            group: 'müzik',
            memberName: 'durdur',
            description: 'Çalmakta Olan Şarkıyı Durdurur.',
            guildOnly: true,
        });
    }

async run (msg, args) {

    const queue = msg.client.queue;

    const serverQueue = queue.get(msg.guild.id);
    if (!serverQueue) return msg.channel.send('<:hayir:487271755530895369> Zaten Şarkı Çalmıyor.');

    if (msg.member.voice.channel !== msg.guild.me.voice.channel) return msg.channel.send('<:hayir:487271755530895369> Botla Aynı Odada Değilsin!');

    serverQueue.songs = [];
    serverQueue.connection.dispatcher.emit('end', '<:evet:487271778834579457> Çalmakta Olan Şarkı Durduruldu!');

    serverQueue.voiceChannel.leave();
}
}