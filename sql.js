/*const path = require('path');

const sql = require('better-sqlite3');
const db = new sql('tablolar.sqlite');

const tables = {
	uyarılar: [
		"id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL",
		"kullanıcı TEXT NOT NULL",
		"sunucu TEXT NOT NULL",
		"yetkili TEXT NOT NULL",
		"sebep TEXT NOT NULL",
		"zaman INTEGER NOT NULL"
	]
}

/*for(let table in tables) {
	db.prepare(`CREATE TABLE ${table} (${tables[table].join(", ")})`, () => {
		console.log(`Initialized table "${table}".`);
});}*/