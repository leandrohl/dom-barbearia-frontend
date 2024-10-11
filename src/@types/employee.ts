
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
