import Axios from 'axios';
import styles from '../../../styles/Formulario.module.scss';

interface IClientesForm {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  cpf: string;
  setCpf: React.Dispatch<React.SetStateAction<string>>;
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>
}

export default function ClientesForm(
  { name, setName,
    cpf, setCpf,
    phone, setPhone,
    address, setAddress }: IClientesForm) {

  function adicionarCliente() {
    Axios.post('http://localhost:3001/cliente/create', {
      name: name,
      cpf: cpf,
      phone: phone,
      address: address
    }).then(() => {
      console.log('sucess');
    });
  }

  return (
    <form onSubmit={adicionarCliente} className={styles.formulario}>
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
      <label htmlFor="cpf">
        Cpf
      </label>
      <input
        type="text"
        name="cpf"
        value={cpf}
        onChange={(event) => setCpf(event.target.value)}
        required
      />
      <label htmlFor="celular">
        Celular
      </label>
      <input
        type="text"
        name="celular"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
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
        Adicionar sabor
      </button>
    </form>
  );
}