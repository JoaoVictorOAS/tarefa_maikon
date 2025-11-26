// src/infrastructure/IAppointmentRepo.ts
import { Appointment } from "../core/model";

export interface IAppointmentRepo {
  save(appointment: Appointment): Promise<void>;
  findAll(): Promise<Appointment[]>;
}

// src/infrastructure/SQLiteAppointmentRepo.ts
// DICA: Use a biblioteca 'sqlite3' ou 'better-sqlite3' aqui
import { IAppointmentRepo } from "./IAppointmentRepo";
// import Database from 'better-sqlite3'; 

export class SQLiteAppointmentRepo implements IAppointmentRepo {
    // Implemente a conexão com o banco aqui
    
    async save(appt: Appointment): Promise<void> {
        // TODO: Escreva o INSERT INTO appointments...
        // Dica: Converta as datas para string ISO antes de salvar no SQLite
    }

    async findAll(): Promise<Appointment[]> {
        // TODO: Escreva o SELECT * FROM appointments...
        return [];
    }
}