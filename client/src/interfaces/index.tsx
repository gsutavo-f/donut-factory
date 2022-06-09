export interface Cliente {
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

