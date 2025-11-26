// ARQUIVO: src/adapters/cli.ts

const { SchedulerService } = require( "../core/SchedulerService");
const { SQLiteAppointmentRepo } = require( "../infrastructure/SQLiteAppointmentRepo");

// 1. Inicialização das Dependências (Composição)
const repo = new SQLiteAppointmentRepo();
const service = new SchedulerService(repo);

// 2. Leitura dos argumentos do terminal
// O array process.argv contém: [node, script, comando, arg1, arg2...]
const args = process.argv.slice(2);
const command = args[0];

// --- Função Auxiliar: Converte String "DD/MM/AAAA" + "HH:MM" para Date (UTC) ---
function parseDate(dateStr: string, timeStr: string): Date {
    const [day, month, year] = dateStr.split('/').map(Number);
    const [hour, minute] = timeStr.split(':').map(Number);
    
    // Atenção: O mês em JS começa em 0 (Janeiro = 0)
    // Usamos Date.UTC para garantir que o horário seja universal
    return new Date(Date.UTC(year, month - 1, day, hour, minute));
}

async function run() {
    try {
        if (command === "listar_compromissos") {
            const list = await service.listAppointments();
            
            if (list.length === 0) {
                console.log("Nenhum compromisso encontrado.");
            } else {
                console.table(list.map(appt => ({
                    ID: appt.id,
                    Inicio: appt.start_datetime.toUTCString(),
                    Fim: appt.end_datetime.toUTCString(),
                    Descricao: appt.description
                })));
            }
        } 
        else if (command === "adicionar_compromisso") {
            // Espera: data hora_inicio hora_fim descricao
            const [_, dateStr, timeStart, timeEnd, description] = args;

            if (!dateStr || !timeStart || !timeEnd || !description) {
                console.error("Erro: Parâmetros faltando.");
                console.error("Uso: adicionar_compromisso <DD/MM/AAAA> <HH:MM> <HH:MM> <DESCRICAO>");
                return;
            }

            const start = parseDate(dateStr, timeStart);
            const end = parseDate(dateStr, timeEnd);

            await service.createAppointment(start, end, description);
            // O log de sucesso já está dentro do service, mas podemos reforçar aqui se quiser
        } 
        else {
            console.log("Comando desconhecido. Use: listar_compromissos ou adicionar_compromisso");
        }
    } catch (error: any) {
        console.error("❌ ERRO:", error.message);
    }
}

run();