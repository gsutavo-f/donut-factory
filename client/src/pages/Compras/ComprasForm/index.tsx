import Axios from 'axios';
import Select from 'react-select';
import styles from '../../../styles/Formulario.module.scss';
import { ClienteSelection, FilialSelection, Compra } from '../../../interfaces';

interface IComprasForm {
  precoTotal: number;
  setPrecoTotal: React.Dispatch<React.SetStateAction<number>>;
  codCliente: number;
  setCodCliente: React.Dispatch<React.SetStateAction<number>>;
  clientesList: ClienteSelection[];
  codFilial: number;
  setCodFilial: React.Dispatch<React.SetStateAction<number>>;
  filiaisList: FilialSelection[];
  getCompras: React.Dispatch<React.SetStateAction<Compra[]>>;
}

export default function ComprasForm(
  { precoTotal, setPrecoTotal,
    codCliente, setCodCliente,
    codFilial, setCodFilial,
    clientesList, filiaisList,
    getCompras }: IComprasForm) {

  function adicionarCompra(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    Axios.post('http://localhost:3001/compra/create', {
      precoTotal: precoTotal,
      codCliente: codCliente,
      codFilial: codFilial
    }).then(() => {
      console.log("sucess");
    });
    getCompras;
  }

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
        placeholder="Seleciona uma filial"
        value={filiaisList.find(obj => obj.value === codFilial)}
        options={filiaisList}
        onChange={(event) => {
          setCodFilial(event!.value);
        }}
      />
      <label htmlFor="precoTotal">
        Preço total
      </label>
      <input
        type="number"
        name="precoTotal"
        value={precoTotal}
        onChange={(event) => setPrecoTotal(event.target.valueAsNumber)}
        required
      />
      <button className={styles.botao} type="submit" onClick={() => getCompras}>
        Adicionar compra
      </button>
    </form>
  );

}