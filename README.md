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
