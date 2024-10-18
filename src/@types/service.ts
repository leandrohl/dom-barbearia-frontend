import { IEmployee } from "./employee";

export interface IService {
  id: number;
  descricao: string;
  preco: number;
}

export interface CreateService {
  descricao: string;
  preco: number;
  funcionarios: number[]
}

export interface ServiceEmployee {
  id: number;
  funcionario: IEmployee;
}
