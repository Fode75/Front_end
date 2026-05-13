const Database = require('better-sqlite3');
const db = new Database("database.db");


db.exec(`
    CREATE TABLE IF NOT EXISTS authors(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT 
    )


    `);

db.exec(`
    CREATE TABLE IF NOT EXISTS articles(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT,
    author_id INTEGER
    )
    `);

module.exports = db;
