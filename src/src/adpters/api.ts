// ARQUIVO: src/adapters/api.ts

const express = require('express');
const { SchedulerService } = require("../core/SchedulerService");
const { SQLiteAppointmentRepo } = require("../infrastructure/SQLiteAppointmentRepo");

const app = express();
app.use(express.json()); // Permite ler JSON no corpo da requisição

// Inicialização (Igual ao CLI)
const repo = new SQLiteAppointmentRepo();
const service = new SchedulerService(repo);

// Rota GET: Listar
app.get('/compromissos', async (req, res) => {
    try {
        const appointments = await service.listAppointments();
        res.json(appointments);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Rota POST: Criar
app.post('/compromissos', async (req, res) => {
    try {
        // O corpo espera: { "data": "25/12/2024", "hora_inicio": "14:00", ... }
        const { data, hora_inicio, hora_fim, descricao } = req.body;

        if (!data || !hora_inicio || !hora_fim || !descricao) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios." });
        }

        // Reutilizamos a lógica de parse (poderia estar em um utils.ts compartilhado)
        const [day, month, year] = data.split('/').map(Number);
        
        const [hStart, mStart] = hora_inicio.split(':').map(Number);
        const start = new Date(Date.UTC(year, month - 1, day, hStart, mStart));

        const [hEnd, mEnd] = hora_fim.split(':').map(Number);
        const end = new Date(Date.UTC(year, month - 1, day, hEnd, mEnd));

        await service.createAppointment(start, end, descricao);
        
        res.status(201).json({ message: "Compromisso criado com sucesso!" });

    } catch (error: any) {
        // Se for erro de sobreposição, retornamos 400 (Bad Request)
        res.status(400).json({ error: error.message });
    }
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log('🔥 Servidor rodando em http://localhost:3000');
});