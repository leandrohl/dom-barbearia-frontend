import { IClient } from "./client";
import { IEmployee } from "./employee";
import { IProduct } from "./product";
import { IService } from "./service";

export interface OrderItem {
  tipo: string;
  valor: number;
  quantidade?: number;
  servicoId?: number;
  produtoId?: number;
  funcionarioId?: number;
}

export interface CreateCommand {
  clienteId: number;
  items: OrderItem[]
}

export interface ICommand {
  id: number;
  dataLancamento: string;
  cliente: IClient;
  items: OrderItemResponse[];
}


export interface OrderItemResponse {
  tipo: string;
  valor: number;
  quantidade?: number;
  servico?: IService;
  produto?: IProduct;
  funcionario?: IEmployee;
}

export interface ICommandWithStatistics {
  novosRetornos: {
    novos: number,
    retorno: number
},
classificacaoDosClientes: {
    Excelente: number,
    Otimo: number,
    Regular: number,
    Ruim: number
},
faturamento: {
    produtos: number,
    servicos: number,
    total: number
}
}
