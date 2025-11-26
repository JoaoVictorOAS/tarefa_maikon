// ARQUIVO: src/infrastructure/SQLiteAppointmentRepo.ts

import sqlite3 from 'sqlite3';
import { Database } from 'sqlite3';
import { IAppointmentRepo } from './IAppointmentRepo';
import { Appointment } from '../core/model';

export class SQLiteAppointmentRepo implements IAppointmentRepo {
    private db: Database;

    constructor() {
        // Cria ou abre o arquivo 'database.sqlite' na raiz do projeto
        this.db = new sqlite3.Database('./database.sqlite', (err) => {
            if (err) {
                console.error('Erro ao conectar ao SQLite:', err.message);
            } else {
                this.initTable();
            }
        });
    }

    // Cria a tabela se ela não existir
    private initTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS appointments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                start_datetime TEXT NOT NULL,
                end_datetime TEXT NOT NULL,
                description TEXT NOT NULL
            )
        `;
        
        this.db.run(sql, (err) => {
            if (err) {
                console.error('Erro ao criar tabela:', err.message);
            }
        });
    }

    // Implementação do método SAVE (do contrato IAppointmentRepo)
    async save(appt: Appointment): Promise<void> {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO appointments (start_datetime, end_datetime, description) VALUES (?, ?, ?)`;
            
            // CONVERSÃO CRÍTICA: Date -> String ISO (UTC)
            const params = [
                appt.start_datetime.toISOString(), 
                appt.end_datetime.toISOString(), 
                appt.description
            ];

            this.db.run(sql, params, function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    // Implementação do método FINDALL (do contrato IAppointmentRepo)
    async findAll(): Promise<Appointment[]> {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM appointments`;

            this.db.all(sql, [], (err, rows: any[]) => {
                if (err) {
                    reject(err);
                } else {
                    // Mapeia as linhas do banco (Strings) de volta para o Modelo (Date Objects)
                    const appointments: Appointment[] = rows.map(row => ({
                        id: row.id,
                        // CONVERSÃO CRÍTICA: String ISO -> Date
                        start_datetime: new Date(row.start_datetime), 
                        end_datetime: new Date(row.end_datetime),
                        description: row.description
                    }));
                    
                    resolve(appointments);
                }
            });
        });
    }
}