import { IEmployee } from "./employee";

export interface IService {
  id: number;
  descricao: string;
  preco: number;
  ativo: boolean;
  servicoFuncionario: ServiceEmployee[]
}

export interface CreateService {
  descricao: string;
  preco: number;
  ativo: boolean;
  funcionarios: number[]
}

export interface ServiceEmployee {
  id: number;
  funcionario: IEmployee;
}
