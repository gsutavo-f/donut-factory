import Axios from 'axios';
import Select from 'react-select';
import { FilialSelection } from '../../../types';
import styles from '../../../styles/Formulario.module.scss';
import DocumentInput from '../../../components/DocumentInput';
import { useState } from 'react';

export default function FuncionariosForm() {
  const [codFilial, setCodFilial] = useState(0);

  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState(0);

  const [filiaisList, setFiliaisList] = useState<FilialSelection[]>([]);

  function adicionarFuncionario(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    Axios.post('http://localhost:3001/funcionario/create', {
      name: name,
      cpf: cpf,
      position: position,
      salary: salary,
      codFilial: codFilial
    }).then(() => {
      console.log("sucess");
    });
  }

  function getFiliais() {
    Axios.get("http://localhost:3001/compra/listFiliais").then((response) => {
      setFiliaisList(response.data);
    });
  }

  getFiliais();

  return (
    <form onSubmit={adicionarFuncionario} className={styles.formulario}>
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
      <button className={styles.botao} type="submit">
        Adicionar funcionário
      </button>
    </form>
  );
}