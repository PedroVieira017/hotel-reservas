const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'hotel.db'); // caminho absoluto
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao abrir a base de dados:', err);
  } else {
    console.log('Base de dados aberta em', dbPath);
  }
});

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
