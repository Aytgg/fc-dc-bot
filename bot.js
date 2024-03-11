const Commando = require('discord.js-commando');
const discord = require('discord.js');
const path = require('path');

const client = new Commando.Client({
    commandPrefix: '*',
    unknownCommandResponse: false,
    owner: [process.env.OWNER_ID_AYSU, process.env.OWNER_ID_AYTUG],
    disableEveryone: true
});
require('./util/eventLoader')(client);

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['bot', 'Bot'],
        ['bilgi', 'Bilgi'],
        ['müzik', 'Müzik'],
        ['sunucu', 'Sunucu'],
        ['yetkili', 'Yetkili'],
        ['altyetkili', 'AltYetkili'],
        ['ekip', 'Ekip'],
        ['uyarı', 'Uyarı'],
        ['kayıt', 'Kayıt'],
        ['başvuru', 'Başvuru'],
        ['çekiliş', 'Çekiliş'],
        ['eğlence', 'Eğlence']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
      help: false
    })
    .registerCommandsIn(path.join(__dirname, './komutlar'));

client.queue = new Map();

const SQLite = require('better-sqlite3');
const guildDataBase = new SQLite(path.join(__dirname, './veriler/ayarlar.sqlite3'))
client.setProvider(
  new Commando.SyncSQLiteProvider(guildDataBase)
);

client.on("ready", async () => {
  client.appInfo = await client.fetchApplication();

  setInterval(async () => {
    client.appInfo = await client.fetchApplication();
  }, 60000);

  require("./modules/dashboard.js")(client);
});

client.login(process.env.BOT_TOKEN).catch(e => console.log(`TOKEN HATALI! HATA: ${e}`));