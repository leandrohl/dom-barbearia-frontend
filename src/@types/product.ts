export interface IProduct {
  id: number;
  descricao: string;
  preco: number;
  quantidade: number;
  ativo: boolean;
}

export interface CreateProduct {
  descricao: string;
  preco: number;
  quantidade: number;
  ativo: boolean;
}
