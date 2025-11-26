export interface Appointment {
    id?: number; // Opcional na criação, obrigatório na leitura
    start_datetime: Date; // Armazenar sempre como UTC
    end_datetime: Date;   // Armazenar sempre como UTC
    description: string;
  }