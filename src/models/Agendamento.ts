export interface Agendamento {
    id: number;
    clienteId: number;
    funcionarioId: number;
    dataAgendamento: Date;
    statusAgendamentoId: number;
    servicosId: number[];
  }
  