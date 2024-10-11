export interface IProduct {
  id: number;
  descricao: string;
  preco: number;
  quantidade: number;
}

export interface CreateProduct {
  descricao: string;
  preco: number;
  quantidade: number;
}
