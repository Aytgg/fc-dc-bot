const { Command } = require('discord.js-commando');
const { MessageEmbed, Util } = require('discord.js');

const YouTube = require('simple-youtube-api');
const youtube = new YouTube(process.env.YT_API_KEY);
const ytdl = require('ytdl-core');

const moment = require('moment');
require('moment-duration-format');

module.exports = class ÇalCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'çal',
            aliases: ['play', 'p', 'oynat'],
            group: 'müzik',
            memberName: 'çal',
            description: 'Şarkı Çalar.',
            guildOnly: true,
            clientPermissions: ['CONNECT', 'SPEAK'],
            args: [
              {
                  key: 'şarkı',
                  prompt: 'Çalmasını istediğiniz şarkının ismini/linkini yazın.',
                  type: 'string'
              }
            ]
        });
    }

async run (msg, args) {

    const queue = msg.client.queue;

    const vc = msg.member.voice.channel;
    const url = args.şarkı.replace(/<(.+)>/g, '$1');
    const serverQueue = queue.get(msg.guild.id);

    if (!vc) return msg.channel.send('<:hayir:487271755530895369> Sesli Odada Değilsin!');

    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/))
    {
      const playlist = await youtube.getPlaylist(url);
      const playlistVideos = await playlist.getVideos();
      for (const video of Object.values(playlistVideos))
      {
        const video2 = await youtube.getVideoByID(video.id);
        await handleVideo(video2, msg, vc, true);
      }
      msg.channel.send("**`" + playlist.title + "`** İsimli Çalma Listesindeki **`" + playlistVideos.length + "`** Şarkı Kuyruğa Eklendi");
    }
    else
    {
      try {
        var video = await youtube.getVideo(url);
      } catch (error) {
        try {
          var searchedVideo = await youtube.searchVideos(args.şarkı, 1);

          if (!searchedVideo) return msg.channel.send('<:hayir:487271755530895369> Eşleşen Parça Bulunamadı!')

          var video = await youtube.getVideoByID(searchedVideo[0].id);
        } catch (err) {
          console.error(err);
          return msg.channel.send('<:hayir:487271755530895369> Eşleşen Parça Bulunamadı!');
        }
      }
      return handleVideo(video, msg, vc);
    }

async function handleVideo(video, msg, vc, playlist = false) {
  const serverQueue = queue.get(msg.guild.id);

  const song = {
    id: video.id,
    title: Util.escapeMarkdown(video.title),
    duration: moment.duration(video.duration).asMilliseconds(),
    url: `https://www.youtube.com/watch?v=${video.id}`,

    requesterTag: msg.author.tag,
    requesterId: msg.author.id
  };

  if (!serverQueue) {
    const queueConstruct = {
      textChannel: msg.channel,
      voiceChannel: vc,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };
    queue.set(msg.guild.id, queueConstruct);

    queueConstruct.songs.push(song);

    try {
      var connection = await vc.join();
      queueConstruct.connection = connection;
      play(msg.guild, queueConstruct.songs[0]);

      queueConstruct.textChannel.send("Çalıyor 🎶 `" + song.title + "` | Ekleyen: *" + (song.requesterTag) + "*")

    } catch (error) {
      queue.delete(msg.guild.id);
      return msg.channel.send("<:hayir:487271755530895369> Bot Odaya Girerken Hata Oluştu! HATA: " + error);
    }
  }
  else
  {
    serverQueue.songs.push(song);
    if (playlist) return undefined;
    else
    {
      let embed = new MessageEmbed()
        .setAuthor("Sıraya Eklendi", msg.author.displayAvatarURL)
        .setThumbnail(`${video.thumbnails.default.url}`)
        .setDescription(`[**${video.title}**](https://www.youtube.com/watch?v=${video.id})`)
        .addField("Kanal", `[${video.channel.title}](https://www.youtube.com/channel/${video.channel.id})`, true)
        .addField("Uzunluk", moment.duration(video.duration).format('hh.mm.ss'), true)
        .addField("Kuyruktaki Sırası", serverQueue.songs.length - 1, true)
        // .addField("Çalmasına Kalan Süre", StreamDispatcher.totalStreamTime - (info.duration + StreamDispatcher.time), true)
      return msg.channel.send(embed)
    }
  }
  return;
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song)
  {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);

    return;
  }
  const dispatcher = serverQueue.connection.play(ytdl(song.url))
    .on('end', reason =>
    {
      if (reason === 'internetten kaynaklı sorun çıktı.' || reason === 'Stream is not generating quickly enough.') return;
      serverQueue.textChannel.send(reason);
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on('error', error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
}
}
}