const reqEvent = (event) => require(`../olaylar/${event}`);
module.exports = client => {
  /*client.on('message',
      reqEvent('export'));*/

  client.on('guildMemberAdd',
      reqEvent('guildMemberAdd'));
  /*client.on('guildMemberAdd',
      reqEvent('resimliGirişKlasik'));
  client.on('guildMemberAdd',
      reqEvent('resimliGirişManzara'));*/
  client.on('guildMemberAdd',
      reqEvent('sayaçGiriş'));

  client.on('guildMemberRemove',
      reqEvent('guildMemberRemove'));
  /*client.on('guildMemberRemove',
      reqEvent('resimliÇıkışKlasik'));
  client.on('guildMemberRemove',
      reqEvent('resimliÇıkışManzara'));*/
  client.on('guildMemberRemove',
      reqEvent('sayaçÇıkış'));

  client.on('guildMemberUpdate',
      reqEvent('guildMemberUpdate'));

  client.on('message',
      reqEvent('message'));
  /*client.on('message',
      reqEvent('oto_Cevaplayıcılar'));*/

  client.on('messageDelete',
      reqEvent('messageDelete'));
  client.on('messageUpdate',
      reqEvent('messageUpdate'));

  client.on('ready', () =>
      reqEvent('ready')(client));
};