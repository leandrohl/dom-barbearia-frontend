export interface IService {
  id: number;
  descricao: string;
  preco: number;
}

export interface CreateService {
  descricao: string;
  preco: number;
}
