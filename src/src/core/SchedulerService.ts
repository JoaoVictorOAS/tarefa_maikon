// src/core/SchedulerService.ts
import { Appointment } from "./model";
import { IAppointmentRepo } from "../infrastructure/IAppointmentRepo";

export class SchedulerService {
  constructor(private repo: IAppointmentRepo) {}

  async listAppointments(): Promise<Appointment[]> {
    return this.repo.findAll();
  }

  async createAppointment(start: Date, end: Date, description: string): Promise<void> {
    // Regra 1: Converter tudo para UTC se já não estiver 
    
    // Passo A: Buscar compromissos existentes
    const existingAppointments = await this.repo.findAll();

    // Passo B: Validar Sobreposição [cite: 7]
    const hasOverlap = existingAppointments.some(appt => {
      // *** SUA TAREFA PRINCIPAL É AQUI ***
      // Você precisa escrever a lógica matemática para verificar se 
      // o novo período (start, end) colide com (appt.start, appt.end).
      // Dica: Ocorre sobreposição se (InicioA < FimB) E (InicioB < FimA)
      return false; // Mude isso!
    });

    if (hasOverlap) {
      throw new Error("Erro: O novo compromisso sobrepõe um existente.");
    }

    // Passo C: Se passou, salvar
    const newAppt: Appointment = {
        start_datetime: start,
        end_datetime: end,
        description
    };
    
    await this.repo.save(newAppt);
    console.log("Compromisso agendado com sucesso!");
  }
}