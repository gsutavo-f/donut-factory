import Axios from 'axios';
import styles from '../../../styles/Formulario.module.scss';
import DocumentInput from '../../../components/DocumentInput';
import PhoneInput from '../../../components/PhoneInput';

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

  function adicionarCliente(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();

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
      <DocumentInput
        value={cpf}
        onChange={(event) => setCpf(event.target.value)}
      />
      <label htmlFor="celular">
        Celular
      </label>
      <PhoneInput
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
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
        Adicionar cliente
      </button>
    </form>
  );
}