const url = require("url");
const path = require("path");

const Discord = require("discord.js");

const express = require("express");
const app = express();
const moment = require("moment");
require("moment-duration-format");

const passport = require("passport");
const session = require("express-session");
const LevelStore = require("level-session-store")(session);
const Strategy = require("passport-discord").Strategy;

const helmet = require("helmet");

const md = require("marked");

module.exports = (client) => {

  const dataDir = path.resolve(`${process.cwd()}${path.sep}dashboard`);

  const templateDir = path.resolve(`${dataDir}${path.sep}templates`);
  
  app.use("/public", express.static(path.resolve(`${dataDir}${path.sep}public`)));

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });

  passport.use(new Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.WEBSITE_DOMAIN + '/callback',
    scope: ['identify', 'guilds']
  },
  (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => done(null, profile));
  }));

  app.use(session({
    secret: 'xyzxyz' + '123123',
    resave: false,
    saveUninitialized: false,
  }));

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(helmet());

  app.locals.domain = process.env.WEBSITE_DOMAIN;
  
  app.engine("html", require("ejs").renderFile);
  app.set("view engine", "html");

  var bodyParser = require("body-parser");
  app.use(bodyParser.json());       
  app.use(bodyParser.urlencoded({   
    extended: true
  })); 

  function checkAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
  }

  const renderTemplate = (res, req, template, data = {}) => {
    const baseData = {
      bot: client,
      path: req.path,
      user: req.isAuthenticated() ? req.user : null
    };
    res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(baseData, data));
    
  };

  app.get("/login", (req, res, next) => {
    if (req.session.backURL) {
      req.session.backURL = req.session.backURL;
    } else if (req.headers.referer) {
      const parsed = url.parse(req.headers.referer);
      if (parsed.hostname === app.locals.domain) {
        req.session.backURL = parsed.path;
      }
    } else {
      req.session.backURL = "/";
    }
    next();
  },
  passport.authenticate("discord"));

  app.get("/callback", passport.authenticate("discord", { failureRedirect: "/autherror" }), (req, res) => {
    if ((req.user.id == process.env.OWNER_ID_AYSU) || (req.user.id == process.env.OWNER_ID_AYTUG)) {
      req.session.isAdmin = true;
    } else {
      req.session.isAdmin = false;
    }
    if (req.session.backURL) {
      const url = req.session.backURL;
      req.session.backURL = null;
      res.redirect(url);
    } else {
      res.redirect("/");
    }
    
  });

  app.get("/autherror", (req, res) => {
    renderTemplate(res, req, "autherror.ejs");
    
    client.channels.get("487325850140934166").send("Web Panelinde bağlantı hatası oluştu! Kişi giriş yapamıyor tekrar denemeli! Büyük bir sorun değil.")
  });

  app.get("/logout", function(req, res) {
    req.session.destroy(() => {
      req.logout();
      res.redirect("/");
    });
    
  });

  app.get("/", (req, res) => {
    renderTemplate(res, req, "index.ejs");
  });

  app.get("/commands", (req, res) => {
    renderTemplate(res, req, "commands.ejs", {md});
  });
  
  app.get("/stats", (req, res) => {
    const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
    const members = client.guilds.reduce((p, c) => p + c.memberCount, 0);
    const channels = client.channels.size;
    const guilds = client.guilds.size;
    renderTemplate(res, req, "stats.ejs", {
      stats: {
        version: 'v1.0',
        servers: guilds,
        members: members,
        channels: channels,
        uptime: duration,
        memoryUsage: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2),
        dVersion: Discord.version,
        nVersion: process.version
      }
    });
  });

  app.get("/sunucular", checkAuth, (req, res) => {
    const perms = Discord.EvaluatedPermissions;
    renderTemplate(res, req, "sunucular.ejs", {perms});
  });
  
  app.get("/admin", checkAuth, (req, res) => {
    if (!req.session.isAdmin) return res.redirect("/");
    renderTemplate(res, req, "admin.ejs");
  });

  app.get("/sunucular/:guildID", checkAuth, (req, res) => {
    res.redirect(`/sunucular/${req.params.guildID}/yonet`);
  });


  app.get("/sunucular/:guildID/yonet", checkAuth, (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has('ADMINISTRATOR') : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");

    var kanallar = [];
    var roller = [];
    var arkaplanlar = [];

    guild.channels.cache.filter(c => c.type == 'text').forEach(c => {
      kanallar.push({ id: c.id, name: c.name })
    })

    guild.roles.cache.filter(r => r.name !== '@everyone').forEach(r => {
      roller.push({ id: r.id, name: r.name })
    })

    arkaplanlar.push({ name: 'Klasik' })
    arkaplanlar.push({ name: 'Manzara' })

    renderTemplate(res, req, "guild/manage.ejs", {guild, moment, kanallar, roller, arkaplanlar});
  });

  app.get("/sunucular/:guildID/yonet/oto-cevaplayici", checkAuth, (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has('ADMINISTRATOR') : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");

    const SQLite = require('better-sqlite3');
    const sql = new SQLite('db.sqlite');

    let getStmt = sql.prepare('SELECT mesaj, cevap FROM oto_cevaplayicilar WHERE sunucu = ?');
    let oto_cevaplayıcılar = getStmt.all(guild.id)

    renderTemplate(res, req, "guild/oto-cevaplayici.ejs", {guild, moment, oto_cevaplayıcılar});
  });

  app.post("/sunucular/:guildID/yonet", checkAuth, (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has('ADMINISTRATOR') : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");

    if (req.body.Prefix) guild.commandPrefix = req.body.Prefix
    if (req.body.ModLogKanalı == 'kapat') guild.settings.remove('ModLogKanalı');
    if (req.body.ModLogKanalı !== 'kapat') guild.settings.set('ModLogKanalı', req.body.ModLogKanalı);
    if (req.body.OtoRol == 'kapat') guild.settings.remove('OtoRol');
    if (req.body.OtoRol !== 'kapat') guild.settings.set('OtoRol', req.body.OtoRol);

    req.body.KüfürFiltresi ? guild.settings.set('KüfürFiltresi', true) : guild.settings.remove('KüfürFiltresi');
    req.body.ReklamFiltresi ? guild.settings.set('ReklamFiltresi', true) : guild.settings.remove('ReklamFiltresi');
    req.body.LinkFiltresi ? guild.settings.set('LinkFiltresi', true) : guild.settings.remove('LinkFiltresi');

    if (req.body.Sayaç) guild.settings.set('Sayaç', req.body.Sayaç);
    if (req.body.SayaçKanalı == 'kapat') { guild.settings.remove('SayaçKanalı'); guild.settings.remove('Sayaç') }
    if (req.body.SayaçKanalı !== 'kapat') guild.settings.set('SayaçKanalı', req.body.SayaçKanalı);

    req.body.ResimliGiriş ? guild.settings.set('ResimliGiriş', true) : guild.settings.remove('ResimliGiriş');
    req.body.ResimliÇıkış ? guild.settings.set('ResimliÇıkış', true) : guild.settings.remove('ResimliÇıkış');
    guild.settings.set('ResimliGirişÇıkışArkaplanı', req.body.ResimliGirişÇıkışArkaplanı);
    if (req.body.ResimliGirişÇıkışKanalı == 'kapat') { guild.settings.remove('ResimliGirişÇıkışKanalı'); guild.settings.remove('ResimliGiriş');  guild.settings.remove('ResimliÇıkış'); }
    if (req.body.ResimliGirişÇıkışKanalı !== 'kapat') guild.settings.set('ResimliGirişÇıkışKanalı', req.body.ResimliGirişÇıkışKanalı);

    if (req.body.KayıtçıRolü == 'kapat') guild.settings.remove('KayıtçıRolü');
    if (req.body.KayıtçıRolü !== 'kapat') guild.settings.set('KayıtçıRolü', req.body.KayıtçıRolü);
    if (req.body.KayıtsızÜyeRolü == 'kapat') guild.settings.remove('KayıtsızÜyeRolü');
    if (req.body.KayıtsızÜyeRolü !== 'kapat') guild.settings.set('KayıtsızÜyeRolü', req.body.KayıtsızÜyeRolü);
    if (req.body.TeyitsizÜyeRolü == 'kapat') guild.settings.remove('TeyitsizÜyeRolü');
    if (req.body.TeyitsizÜyeRolü !== 'kapat') guild.settings.set('TeyitsizÜyeRolü', req.body.TeyitsizÜyeRolü);
    if (req.body.ErkekÜyeRolü == 'kapat') guild.settings.remove('ErkekÜyeRolü');
    if (req.body.ErkekÜyeRolü !== 'kapat') guild.settings.set('ErkekÜyeRolü', req.body.ErkekÜyeRolü);
    if (req.body.KadınÜyeRolü == 'kapat') guild.settings.remove('KadınÜyeRolü');
    if (req.body.KadınÜyeRolü !== 'kapat') guild.settings.set('KadınÜyeRolü', req.body.KadınÜyeRolü);

    if (req.body.EkipRolü == 'kapat') guild.settings.remove('EkipRolü');
    if (req.body.EkipRolü !== 'kapat') guild.settings.set('EkipRolü', req.body.EkipRolü);
    if (req.body.EkipTagı) guild.settings.set('EkipTagı', req.body.Sayaç)


    if (req.body.BaşvuruKanalı == 'kapat') guild.settings.remove('BaşvuruKanalı');
    if (req.body.BaşvuruKanalı !== 'kapat') guild.settings.set('BaşvuruKanalı', req.body.BaşvuruKanalı);
    if (req.body.ÇekilişKanalı == 'kapat') guild.settings.remove('ÇekilişKanalı');
    if (req.body.ÇekilişKanalı !== 'kapat') guild.settings.set('ÇekilişKanalı', req.body.ÇekilişKanalı);
    if (req.body.CezalarKanalı == 'kapat') guild.settings.remove('CezalarKanalı');
    if (req.body.CezalarKanalı !== 'kapat') guild.settings.set('CezalarKanalı', req.body.CezalarKanalı);

    res.redirect("/sunucular/"+req.params.guildID+"/yonet");
  });

  app.post("/sunucular/:guildID/yonet/oto-cevaplayici", checkAuth, (req, res) => {
    const guild = client.guilds.cache.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has('ADMINISTRATOR') : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");

    if (req.body.OtomatikCevaplayıcıMesaj && req.body.OtomatikCevaplayıcıCevap) {
      const SQLite = require('better-sqlite3');
      const sql = new SQLite('db.sqlite');

      let setStmt = sql.prepare('INSERT INTO oto_cevaplayicilar (sunucu, mesaj, cevap) VALUES (?, ?, ?)');
      setStmt.run(guild.id, req.body.OtomatikCevaplayıcıMesaj, req.body.OtomatikCevaplayıcıCevap);
    }

    res.redirect("/sunucular/"+req.params.guildID+"/yonet/oto-cevaplayici");
  });

  app.get("/sunucular/:guildID/members", checkAuth, async (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    renderTemplate(res, req, "guild/members.ejs", {
      guild: guild,
      members: guild.members.array()
    });
  });

  // This JSON endpoint retrieves a partial list of members. This list can
  // be filtered, sorted, and limited to a partial count (for pagination).
  // NOTE: This is the most complex endpoint simply because of this filtering
  // otherwise it would be on the client side and that would be horribly slow.
  app.get("/sunucular/:guildID/members/list", checkAuth, async (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    if (req.query.fetch) {
      await guild.fetchMembers();
    }
    const totals = guild.members.size;
    const start = parseInt(req.query.start, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 50;
    let members = guild.members;
    
    if (req.query.filter && req.query.filter !== "null") {
    
      members = members.filter(m=> {
        m = req.query.filterUser ? m.user : m;
        return m["displayName"].toLowerCase().includes(req.query.filter.toLowerCase());
      });
    }
    
    if (req.query.sortby) {
      members = members.sort((a, b) => a[req.query.sortby] > b[req.query.sortby]);
    }
    const memberArray = members.array().slice(start, start+limit);
    
    const returnObject = [];
    for (let i = 0; i < memberArray.length; i++) {
      const m = memberArray[i];
      returnObject.push({
        id: m.id,
        status: m.user.presence.status,
        bot: m.user.bot,
        username: m.user.username,
        displayName: m.displayName,
        tag: m.user.tag,
        discriminator: m.user.discriminator,
        joinedAt: m.joinedTimestamp,
        createdAt: m.user.createdTimestamp,
        highestRole: {
          hexColor: m.roles.highest.hexColor
        },
        memberFor: moment.duration(Date.now() - m.joinedAt).format(" D [gün], H [saat], m [dakika], s [saniye]"),
        roles: m.roles.map(r=>({
          name: r.name,
          id: r.id,
          hexColor: r.hexColor
        }))
      });
    }
    res.json({
      total: totals,
      page: (start/limit)+1,
      pageof: Math.ceil(members.size / limit),
      members: returnObject
    });
  });

  app.get("/sunucular/:guildID/stats", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has('ADMINISTRATOR') : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    renderTemplate(res, req, "guild/stats.ejs", {guild, moment});
  });

  app.get("/sunucular/:guildID/leave", checkAuth, async (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has('ADMINISTRATOR') : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    await guild.leave();
    res.redirect("/sunucular");
  });

  app.get("/sunucular/:guildID/reset", checkAuth, async (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has('ADMINISTRATOR') : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");

    guild.commandPrefix = client.commandPrefix;

    guild.settings.remove('KüfürFiltresi');
    guild.settings.remove('ReklamFiltresi');
    guild.settings.remove('LinkFiltresi');

    guild.settings.remove('BaşvuruKanalı');
    guild.settings.remove('CezalarKanalı');
    guild.settings.remove('ModLogKanalı');
    guild.settings.remove('OtoRol');

    guild.settings.remove('ResimliGiriş');
    guild.settings.remove('ResimliÇıkış');
    guild.settings.remove('ResimliGirişÇıkışArkaplanı');
    guild.settings.remove('ResimliGirişÇıkışKanalı');

    res.redirect("/sunucular/"+req.params.guildID+"/yonet");
  });

  app.get("/sunucular/:guildID/yonet/oto-cevaplayici/sil/:otoCevaplayiciMesaj/:otoCevaplayiciCevap", checkAuth, async (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has('ADMINISTRATOR') : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");

    const SQLite = require('better-sqlite3');
    const sql = new SQLite('db.sqlite');

    let delStmt = sql.prepare('DELETE FROM oto_cevaplayicilar WHERE sunucu = ? AND mesaj = ? AND cevap = ?');
    delStmt.run(guild.id, req.params.otoCevaplayiciMesaj, req.params.otoCevaplayiciCevap);

    res.redirect("/sunucular/"+req.params.guildID+"/yonet/oto-cevaplayici");
  });

  app.get("/sunucular/:guildID/yonet/oto-cevaplayici/hepsini-sil", checkAuth, async (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has('ADMINISTRATOR') : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");

    const SQLite = require('better-sqlite3');
    const sql = new SQLite('db.sqlite');

    let delStmt = sql.prepare('DELETE FROM oto_cevaplayicilar WHERE sunucu = ?');
    delStmt.run(guild.id);

    res.redirect("/sunucular/"+req.params.guildID+"/yonet/oto-cevaplayici");
  });

  client.site = app.listen(process.env.PORT);

};