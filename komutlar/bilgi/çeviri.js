const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

const translate = require('node-google-translate-skidz');
const dil = {
				'ab': 'Abhazca',
				'aa': 'Afar Dili',
				'af': 'Afrika Dili',
				'de': 'Almanca',
				'am': 'Amhara Dili',
				'ar': 'Arapça',
				'an': 'Aragonca',
				'sq': 'Arnavutça',
				'as': 'Assam Dili',
				'ay': 'Aymara Dili',
				'az': 'Azerice',
				'eu': 'Baskça',
				'ba': 'Başkurtça',
				'bn': 'Bengal Dili',
				'be': 'Beyaz Rusça',
				'bh': 'Biharice',
				'my': 'Birmanca',
				'br': 'Bretonca',
				'bg': 'Bulgarca',
				'dz': 'Butanca',
				'jv': 'Cava Dili',
				'cs': 'Çekçe',
				'zh': 'Çince',
				'da': 'Danimarkaca',
				'id': 'Endonezya Dili',
				'in': 'Endonezya Dili',
				'hy': 'Ermenice',
				'eo': 'Esperanto Dili',
				'et': 'Estonca',
				'fo': 'Faroece',
				'fa': 'Farsça',
				'fj': 'Fijice',
				'fi': 'Fince',
				'nl': 'Flemenkçe',
				'fr': 'Fransızca',
				'fy': 'Frizye Dili',
				'gl': 'Galiçya Dili',
				'cy': 'Galce',
				'gd': 'Galce (İskoç)',
				'gv': 'Galce (Manx)',
				'kl': 'Grönlandca',
				'gn': 'Guarani Dili',
				'gu': 'Gucerat Dili',
				'ka': 'Gürcüce',
				'ht': 'Haiti Dili',
				'ha': 'Hausa Dili',
				'hr': 'Hırvatça',
				'hi': 'Hintçe',
				'iu': 'Inuktitut Dili',
				'he': 'İbranice',
				'iw': 'İbranice',
				'io': 'İdo Dili',
				'en': 'İngilizce',
				'ik': 'İnupiakça',
				'ga': 'İrlanda Dili',
				'es': 'İspanyolca',
				'sv': 'İsveçce',
				'it': 'İtalyanca',
				'is': 'İzlandaca',
				'ja': 'Japonca',
				'km': 'Kamboçya Dili',
				'kn': 'Kannada Dili',
				'ca': 'Katalanca',
				'kk': 'Kazakça',
				'qu': 'Keçuva Dili',
				'ks': 'Keşmirce',
				'ky': 'Kırgızca',
				'rw': 'Kinyarvanda Dili',
				'rn': 'Kirundi Dili',
				'ko': 'Korece',
				'co': 'Korsika Dili',
				'ku': 'Kürtçe',
				'la': 'Latince',
				'lv': 'Letonca',
				'li': 'Limburgca',
				'ln': 'Lingala Dili',
				'lt': 'Litvanca',
				'lo': 'Litvan Dili',
				'hu': 'Macarca',
				'mg': 'Madagaskar Dili',
				'mk': 'Makedonca',
				'ms': 'Malay Dili',
				'ml': 'Malayalam Dili',
				'mt': 'Malta Dili',
				'mi': 'Maori Dili',
				'mr': 'Marathi Dili',
				'mo': 'Moldovca',
				'mn': 'Moğolca',
				'na': 'Nauru Dili',
				'ne': 'Nepal Dili',
				'no': 'Norveçce',
				'oc': 'Oksitan Dili',
				'or': 'Oriya Dili',
				'om': 'Oromo Dili',
				'uz': 'Özbekçe',
				'bi': 'Papua Yeni Ginece',
				'pa': 'Pencap Dili',
				'ps': 'Peştuca',
				'pl': 'Polonyaca',
				'pt': 'Portekizce',
				'rm': 'Romansça',
				'ro': 'Romence',
				'ru': 'Rusça',
				'sm': 'Samoa Dili',
				'sg': 'Sangro',
				'sa': 'Sanskritçe',
				'tn': 'Setsvana Dili',
				'si': 'Seylanca',
				'sn': 'Shona Dili',
				'sr': 'Sırpça',
				'sh': 'Sırp Hırvatçası',
				'sd': 'Sindçe',
				'ss': 'Siswati Dili',
				'ii': 'Sişuan Yi',
				'st': 'Soto Dili',
				'sk': 'Slovakça',
				'sl': 'Slovence',
				'so': 'Somali Dili',
				'su': 'Sundanca',
				'sw': 'Svahili Dili',
				'tg': 'Tacikçe',
				'tl': 'Tagalog Dili',
				'ta': 'Tamilce',
				'tt': 'Tatarca',
				'th': 'Tayca',
				'te': 'Telugu Dili',
				'bo': 'Tibetçe',
				'ti': 'Tigrinya Dili',
				'ts': 'Tsonga Dili',
				'tr': 'Türkçe',
				'tk': 'Türkmence',
				'tw': 'Tvi Dili',
				'uk': 'Ukraynaca',
				'ur': 'Urdu Dili',
				'ug': 'Uygurca',
				'vi': 'Vietnamca',
				'vo': 'Volapük Dili',
				'wo': 'Volof Dili',
				'wa': 'Wallon Dili',
				'yi': 'Yidce',
				'ji': 'Yidce',
				'yo': 'Yoruba Dili',
				'xh': 'Zosa Dili'
			}

module.exports = class ÇeviriCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'çeviri',
            aliases: ['çevir', 'cevir', 'ceviri', 'translate'],
            group: 'bilgi',
            memberName: 'çeviri',
            description: 'Çeviri Yapar.',
            args: [
                {
                    key: 'dil1',
                    prompt: 'Hangi dilden çevrileceğini yazın.',
                    type: 'string',
                    validate: (value, msg, arg) => {
                      let lc = value.toLowerCase()

                      if (dil[lc]) return true;
                      return 'Geçersiz dil. Dil iso kodlarına bakmak için [tıklayın](https://www.deepbilgi.com/tum-ulkelerin-iso-dil-kodlari.html).';
                    }
                },
                {
                    key: 'dil2',
                    prompt: 'Hangi dile çevrileceğini yazın.',
                    type: 'string',
                    validate: (value, msg, arg) => {
                      let lc = value.toLowerCase()

                      if (dil[lc]) return true;
                      return 'Geçersiz dil. Dil iso kodlarına bakmak için [tıklayın](https://www.deepbilgi.com/tum-ulkelerin-iso-dil-kodlari.html)';
                    }
                },
                {
                    key: 'yazı',
                    prompt: 'Çevrilecek yazıyı yazın.',
                    type: 'string'
                }
            ]
        });
    }

async run(msg, args) {
	translate({
		text: args.yazı,
		source: args.dil1,
		target: args.dil2
	}).then(result => {
		if(dil[args.dil1] === undefined || dil[args.dil2] === undefined) return msg.reply('HATA OLUŞTU');

		const embed = new MessageEmbed()
			.setAuthor('Çeviri', 'https://images.techhive.com/images/article/2017/05/pcw-translate-primary-100723319-orig.jpg', 'https://translate.google.com/')
			.addField(dil[args.dil1] + ' => ' + dil[args.dil2], result.translation)
			.setColor('0x36393F')
			.setTimestamp()
		msg.channel.send(embed)
	}).catch(e => {
    msg.reply('HATA OLUŞTU');
    console.log(e)
	})
}
}