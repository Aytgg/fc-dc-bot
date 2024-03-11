const chalk = require('chalk');

module.exports = client => {
  console.log(chalk.bgGreen(`BOT ${client.user.tag} ADI ILE GIRIS YAPTI`));

  client.user.setActivity('》Fairy Canary Bot !yardım 《', { type: 'LISTENING' })
  var Games = [
              "》Fairy Canary Bot | *yardım《",
              "》Yeni 》YOK《",
              "》Müzik Komutları Yenilendi《",
              "*yardım | " + client.guilds.size + " Sunucu | " + client.users.size + " Kullanıcı"
              ];
  setInterval(function() {
    var random = Math.floor(Math.random()*(Games.length+1));

                                                                    // 0=PLAYING 2=LISTENING 3=WATCHING 4=STREAMING ON TWITCH
    client.user.setActivity(Games[random], { type: 'LISTENING' });
  }, 10000);
}