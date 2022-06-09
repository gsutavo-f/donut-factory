import Axios from 'axios';
import styles from '../../../styles/Formulario.module.scss';

interface IFuncionariosForm {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  cpf: string;
  setCpf: React.Dispatch<React.SetStateAction<string>>;
  position: string;
  setPosition: React.Dispatch<React.SetStateAction<string>>;
  salary: number;
  setSalary: React.Dispatch<React.SetStateAction<number>>;
  filial: number;
  setFilial: React.Dispatch<React.SetStateAction<number>>;
}

export default function FuncionariosForm(
  { name, setName,
    cpf, setCpf,
    position, setPosition,
    salary, setSalary,
    filial, setFilial }: IFuncionariosForm) {

  function adicionarFuncionario(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    Axios.post('http://localhost:3001/funcionario/create', {
      name: name,
      cpf: cpf,
      position: position,
      salary: salary,
      filial: filial
    }).then(() => {
      console.log("sucess");
    });
  }

  return (
    <form onSubmit={adicionarFuncionario}>
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
      <label htmlFor="cargo">
        Cargo
      </label>
      <input
        type="text"
        name="cargo"
        value={position}
        onChange={(event) => setPosition(event.target.value)}
        required
      />
      <label htmlFor="salario">
        Salário
      </label>
      <input
        type="number"
        name="salario"
        value={salary}
        onChange={(event) => setSalary(event.target.valueAsNumber)}
        required
      />
      <label htmlFor="filial">
        Filial
      </label>
      <input
        type="number"
        name="filial"
        value={filial}
        onChange={(event) => setFilial(event.target.valueAsNumber)}
        required
      />
      <button className={styles.botao} type="submit">
        Adicionar funcionário
      </button>
    </form>
  );
}