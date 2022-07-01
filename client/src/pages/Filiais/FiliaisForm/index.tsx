import Axios from 'axios';
import styles from '../../../styles/Formulario.module.scss';

interface IFiliaisForm {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
}

export default function FiliaisForm(
  { name, setName,
    address, setAddress }: IFiliaisForm) {

  function adicionarFilial(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    Axios.post('http://localhost:3001/filial', {
      name: name,
      address: address
    }).then(() => {
      console.log("sucess");
    });
  }

  return (
    <form onSubmit={adicionarFilial} className={styles.formulario}>
      <label htmlFor="nome">
        Nome
      </label>
      <input
        type="text"
        name="nome"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
      />
      <label htmlFor="endereco">
        Endereço
      </label>
      <input
        type="text"
        name="endereco"
        value={address}
        onChange={(event) => setAddress(event.target.value)}
        required
      />

      <button className={styles.botao} type="submit">
        Adicionar filial
      </button>
    </form>
  )
}
