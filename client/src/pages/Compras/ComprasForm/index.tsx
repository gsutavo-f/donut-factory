import Axios from 'axios';
import Select from 'react-select';
import { useEffect } from 'react';
import styles from '../../../styles/Formulario.module.scss';
import { ClienteSelection, FilialSelection, SaborSelection, Compra } from '../../../types';

interface IComprasForm {
  quantidade: number;
  setQuantidade: React.Dispatch<React.SetStateAction<number>>;
  codCliente: number;
  setCodCliente: React.Dispatch<React.SetStateAction<number>>;
  clientesList: ClienteSelection[];
  codFilial: number;
  setCodFilial: React.Dispatch<React.SetStateAction<number>>;
  filiaisList: FilialSelection[];
  getCompras: React.Dispatch<React.SetStateAction<Compra[]>>;
  saboresList: SaborSelection[];
  codSabor: number;
  setCodSabor: React.Dispatch<React.SetStateAction<number>>;
  setSaboresList: React.Dispatch<React.SetStateAction<SaborSelection[]>>;
}

export default function ComprasForm(
  { quantidade, setQuantidade,
    codCliente, setCodCliente,
    codFilial, setCodFilial,
    codSabor, setCodSabor,
    clientesList, filiaisList,
    saboresList, setSaboresList,
    getCompras }: IComprasForm) {

  function adicionarCompra(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    Axios.post('http://localhost:3001/compra/create', {
      quantidade: quantidade,
      codCliente: codCliente,
      codFilial: codFilial,
      codSabor: codSabor
    }).then(() => {
      console.log("sucess");
    });
  }

  useEffect(() => {
    Axios.get(`http://localhost:3001/compra/listSaboresByFilial/${codFilial}`).then((response) => {
      setSaboresList(response.data);
    })
  }, [codFilial]);

  return (
    <form onSubmit={adicionarCompra} className={styles.formulario}>
      <label htmlFor="cliente">
        Cliente
      </label>
      <Select
        className={styles.combobox}
        name="cliente"
        placeholder="Selecione um cliente"
        value={clientesList.find(obj => obj.value === codCliente)}
        options={clientesList}
        onChange={(event) => {
          setCodCliente(event!.value);
        }}
      />
      <label htmlFor="filial">
        Filial
      </label>
      <Select
        className={styles.combobox}
        name="filial"
        placeholder="Selecione uma filial"
        value={filiaisList.find(obj => obj.value === codFilial)}
        options={filiaisList}
        onChange={(event) => {
          setCodFilial(event!.value);
        }}
      />
      <label htmlFor="sabor">
        Sabor
      </label>
      <Select
        className={styles.combobox}
        name="sabor"
        placeholder="Selecione um sabor"
        value={saboresList.find(obj => obj.value === codSabor)}
        options={saboresList}
        onChange={(event) => {
          setCodSabor(event!.value);
        }}
      />
      <label htmlFor="quantidade">
        Quantidade
      </label>
      <input
        type="number"
        name="quantidade"
        value={quantidade}
        onChange={(event) => setQuantidade(event.target.valueAsNumber)}
        required
      />
      <button className={styles.botao} type="submit">
        Adicionar compra
      </button>
    </form>
  );

}