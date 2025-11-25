// src/adapters/cli.ts
import { SchedulerService } from "../core/SchedulerService";
import { SQLiteAppointmentRepo } from "../infrastructure/SQLiteAppointmentRepo";

// Injeção de Dependência manual
const repo = new SQLiteAppointmentRepo();
const service = new SchedulerService(repo);

const args = process.argv.slice(2);
const command = args[0];

async function run() {
  if (command === "listar_compromissos") { // [cite: 36]
    const list = await service.listAppointments();
    console.table(list);
  } 
  else if (command === "adicionar_compromisso") { // [cite: 37]
    // Formato esperado: data hora_inicio hora_fim descricao
    // Ex: "25/12/2024" "14:00" "15:00" "Natal"
    const [_, dateStr, timeStart, timeEnd, desc] = args;
    
    // TODO: Você precisa criar uma função que pegue essas strings 
    // e transforme em objetos Date do JavaScript corretamente.
    
    try {
        // await service.createAppointment(parsedStart, parsedEnd, desc);
    } catch (e) {
        console.error(e.message);
    }
  }
}

run();