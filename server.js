const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Armazenar os dados no servidor
let counts = {
    Ana: { made: 0, received: 0 },
    Carol: { made: 0, received: 0 },
    Heverson: { made: 0, received: 0 },
    Elian: { made: 0, received: 0 },
    Victor: { made: 0, received: 0 }
};

app.use(bodyParser.json());
app.use(express.static('public'));

// Rota para obter os dados
app.get('/api/counts', (req, res) => {
    res.json(counts);
});

// Rota para atualizar os dados
app.post('/api/update', (req, res) => {
    const { person, type, value } = req.body;
    if (counts[person]) {
        counts[person][type] += value;
        if (counts[person][type] < 0) counts[person][type] = 0;
        res.status(200).json(counts);
    } else {
        res.status(400).json({ error: 'Pessoa não encontrada' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
