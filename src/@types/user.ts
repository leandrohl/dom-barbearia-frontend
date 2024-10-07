
export interface IUser {
  id: number;
  nome: string;
  email: string;
  perfil: string;
}

export interface CreateUser {
  nome: string;
  email: string;
  senha: string;
  perfil: number;
}


export interface IEditUser {
  nome: string;
  email: string;
  perfil: number;
}
