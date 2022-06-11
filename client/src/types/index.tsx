export interface ClienteSelection {
  value: number,
  label: string
}

export interface FilialSelection {
  value: number,
  label: string
}

export interface SaborSelection {
  value: number,
  label: string
}

export interface Sabor {
  codigo: number,
  nome: string,
  preco: number,
  numvendas: number,
  ingrediente: string,
  tipo: number;
}

export interface Colunas {
  titulo: string;
  valor: string | number;
}

export interface Compra {
  id: number,
  codcliente: number,
  precototal: number,
  datacompra: string
}

export interface Filial {
  id: number,
  nome: string,
  endereco: string
}

export type StringNumber = string | number;

