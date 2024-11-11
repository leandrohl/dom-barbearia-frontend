export interface IClient {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  dataAniversario: string;
  cpf: string;
  endereco: string;
  bairro: string;
  cidade: string;
  profissao: string;
  observacao?: string;
}

export interface IClientWithStatistics {
  id: number;
  nome: string;
  classificacao: string;
  frequenciaVisitas: number;
  valorGastoTotal: number;
  ultimaVisita: string;
}

export type CreateClient = Omit<IClient, 'id'>;
