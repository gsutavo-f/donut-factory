import { useState } from 'react';
import styles from './Funcionarios.module.scss';
import Axios from 'axios';
import Modal from 'react-modal';
import FuncionariosForm from './FuncionariosForm';

interface Funcionario {
  nome: string,
  cpf: string,
  cargo: string,
  salario: number,
  codfilial: number
}

Modal.setAppElement('#root');

export default function Funcionarios() {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState(0);
  const [filial, setFilial] = useState(0);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [employeeList, setEmployeeList] = useState<Funcionario[]>([]);

  const addFuncionario = () => {
    Axios.post('http://localhost:3001/funcionario/create', {
      name: name,
      cpf: cpf,
      position: position,
      salary: salary,
      filial: filial
    }).then(() => {
      console.log("sucess");
    });
  };

  const getEmployees = () => {
    Axios.get('http://localhost:3001/funcionario/list').then((response) => {
      setEmployeeList(response.data);
    });
  };

  return (
    <div className={styles.App}>
      <div className={styles.botao}>
        <button onClick={() => setModalIsOpen(true)}>
          Adicionar novo funcionário
        </button>
        <button onClick={getEmployees}>
          Listar funcionários
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <FuncionariosForm
          name={name}
          setName={setName}
          cpf={cpf}
          setCpf={setCpf}
          position={position}
          setPosition={setPosition}
          salary={salary}
          setSalary={setSalary}
          filial={filial}
          setFilial={setFilial}
        />
      </Modal>

      <div className={styles.employees}>
        {employeeList.map((val, key) => {
          return (
            <div className={styles.employee} key={key}>
              <h3>Name: {val.nome}</h3>
              <h3>Document: {val.cpf}</h3>
              <h3>Position: {val.cargo}</h3>
              <h3>Salary: {val.salario}</h3>
              <h3>Filial: {val.codfilial}</h3>
            </div>
          );
        })}
      </div>
    </div>
  )
}
