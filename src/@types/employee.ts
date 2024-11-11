
export interface IEmployee {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  dataContratacao: string;
  ativo: boolean;
}


export interface CreateEmployee {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  dataContratacao: string;
  ativo: boolean;
}

export interface IEmployeeWithStatistics {
  id: number;
  nome: string;
  faturamentoTotal: number;
  clientesNovos: number;
  totalComandas: number;
  classificacaoDosClientes: {
    Excelente: number,
    Otimo: number,
    Regular: number,
    Ruim: number,
  }
}
