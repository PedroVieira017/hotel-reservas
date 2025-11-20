const express = require('express');
const cors = require('cors');
const path = require('path');       // 👈 adicionar isto
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Servir ficheiros estáticos da pasta "public"
app.use(express.static(path.join(__dirname, 'public')));  // 👈 linha importante

// (se quiseres podes apagar esta rota ou mudar para /api)
// app.get('/', (req, res) => {
//   res.send('API de Reservas de Hotel está a funcionar!');
// });

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

app.listen(PORT, () => {
  console.log(`Servidor a correr em http://localhost:${PORT}`);
});
