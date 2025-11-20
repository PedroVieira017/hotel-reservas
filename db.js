// db.js
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./hotel.db');

// Cria tabela se não existir
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS reservas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL,
      quarto TEXT NOT NULL,
      data_checkin TEXT NOT NULL,
      data_checkout TEXT NOT NULL
    )
  `);
});

module.exports = db;
