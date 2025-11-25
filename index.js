const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Criar reserva
app.post('/reservas', (req, res) => {
  const { nome, email, quarto, data_checkin, data_checkout } = req.body;

  if (!nome || !email || !quarto || !data_checkin || !data_checkout) {
    return res.status(400).json({ erro: 'Faltam campos obrigatórios.' });
  }

  const query = `
    INSERT INTO reservas (nome, email, quarto, data_checkin, data_checkout)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(query, [nome, email, quarto, data_checkin, data_checkout], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ erro: 'Erro ao criar reserva.' });
    }

    res.status(201).json({
      mensagem: 'Reserva criada com sucesso!',
      id: this.lastID
    });
  });
});

// Listar reservas
app.get('/reservas', (req, res) => {
  db.all('SELECT * FROM reservas', [], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ erro: 'Erro ao buscar reservas.' });
    }
    res.json(rows);
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor a correr na porta ${PORT}`);
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
