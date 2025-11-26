-- README GERADO POR IA 

# 📅 Sistema de Agendamento (Scheduler)

Projeto desenvolvido para a disciplina de Arquitetura de Software. Implementa um sistema de gerenciamento de compromissos focado em **Clean Architecture**, desacoplamento de camadas e regras de negócio isoladas.

## 🎯 Objetivo
O sistema permite listar e adicionar compromissos, garantindo a integridade da agenda através de uma **Regra de Negócio Única**:
> **Não permitir sobreposição de períodos.** Um novo compromisso não pode ser cadastrado se colidir com o horário de um existente.

## 🏗️ Arquitetura do Projeto

O software segue estritamente a arquitetura em camadas solicitada, garantindo que a lógica de negócios desconheça a implementação do banco de dados ou da interface de usuário.

```text
src/
├── adapters/          # Interface com o mundo externo
│   ├── cli.ts         # Interface de Linha de Comando (CLI)
│   └── api.ts         # Interface REST (HTTP)
├── core/              # O "Coração" do software
│   ├── model.ts       # Definição do Modelo (Appointment)
│   └── SchedulerService.ts # Regras de Negócio (Validação de Sobreposição)
└── infrastructure/    # Implementações concretas
    ├── IAppointmentRepo.ts # Contrato (Interface) do Repositório
    └── SQLiteAppointmentRepo.ts # Implementação com SQLite



🛠️ Tecnologias e Decisões de Design
Linguagem: TypeScript

Banco de Dados: SQLite

Timezones: Todo o armazenamento e manipulação de datas é feito estritamente em UTC para evitar erros de fuso horário.

Design Patterns: Repository Pattern, Dependency Injection.

🚀 Instalação e Configuração
Instale as dependências:

Bash

npm install
Configure o Banco de Dados: O sistema utiliza SQLite. Certifique-se de que o arquivo do banco seja criado na primeira execução ou inicialize-o conforme a implementação do repositório.

📖 Como Usar
1. Interface de Linha de Comando (CLI)
O sistema possui uma CLI robusta para interação rápida.

Listar todos os compromissos:

Bash

npx ts-node src/cli.ts listar_compromissos
Adicionar novo compromisso: O formato deve ser dd/mm/aaaa para a data e hh:mm para os horários.

Bash

npx ts-node src/cli.ts adicionar_compromisso "25/12/2024" "14:00" "15:00" "Reunião de Natal"
2. Interface API REST
Para consumir o serviço via HTTP/JSON.

Iniciar o servidor:

Bash

npx ts-node src/api.ts
Rotas Disponíveis:

GET /compromissos - Retorna a lista de agendamentos.

POST /compromissos - Cria um agendamento.

Exemplo de Payload (JSON):

JSON

{
  "data": "25/12/2024",
  "hora_inicio": "14:00",
  "hora_fim": "15:00",
  "descricao": "Reunião de Natal"
}
✅ Checklist de Requisitos
[x] Listar e Adicionar compromissos.

[x] Validação de sobreposição de horários.

[x] Arquitetura em camadas (Interface, Negócio, Persistência).

[x] Uso de UTC.

[x] Adapters para CLI e REST.