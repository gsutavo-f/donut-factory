import Axios from 'axios';
import Select from 'react-select';
import styles from '../../../styles/Formulario.module.scss';
import { Cliente } from '../../../interfaces/Cliente';

interface IComprasForm {
  precoTotal: number;
  setPrecoTotal: React.Dispatch<React.SetStateAction<number>>;
  codCliente: number;
  setCodCliente: React.Dispatch<React.SetStateAction<number>>;
  clientesList: Cliente[];
}

export default function ComprasForm(
  { precoTotal, setPrecoTotal,
    codCliente, setCodCliente,
    clientesList }: IComprasForm) {

  function adicionarCompra(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    Axios.post('http://localhost:3001/compra/create', {
      precoTotal: precoTotal,
      codCliente: codCliente,
    }).then(() => {
      console.log("sucess");
    });
  }

  return (
    <form onSubmit={adicionarCompra} className={styles.formulario}>
      <label htmlFor="cliente">
        Cliente
      </label>
      <Select
        className={styles.combobox}
        name="cliente"
        value={clientesList.find(obj => obj.value === codCliente)}
        options={clientesList}
        onChange={(event) => {
          setCodCliente(event!.value);
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
      <button className={styles.botao} type="submit">
        Adicionar compra
      </button>
    </form>
  );

}