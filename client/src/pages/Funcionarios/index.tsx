import { useState } from 'react';
import stylesTema from '../../components/PaginaPadrao/PaginaPadrao.module.scss';
import Axios from 'axios';
import Modal from '../../components/Modal';
import FuncionariosForm from './FuncionariosForm';
import { FilialSelection } from '../../types';

interface Funcionario {
  nome: string,
  cpf: string,
  cargo: string,
  salario: number,
  codfilial: number
}

export default function Funcionarios() {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState(0);
  const [codFilial, setCodFilial] = useState(0);

  const [openModal, setOpenModal] = useState(false);

  const [filiaisList, setFiliaisList] = useState<FilialSelection[]>([]);
  const [employeeList, setEmployeeList] = useState<Funcionario[]>([]);

  const getEmployees = () => {
    Axios.get('http://localhost:3001/funcionario/list').then((response) => {
      setEmployeeList(response.data);
    });
  };

  Axios.get('http://localhost:3001/compra/listFiliais').then((response) => {
    setFiliaisList(response.data);
  });

  return (
    <>
      <div className={stylesTema.paginas}>
        <div className={stylesTema.paginas__botoes}>
          <button
            onClick={() => setOpenModal(true)}
            className={stylesTema.paginas__botoes__botao}
          >
            Adicionar novo funcionário
          </button>
          <button
            onClick={getEmployees}
            className={stylesTema.paginas__botoes__botao}
          >
            Listar funcionários
          </button>
        </div>
        <div className={stylesTema.paginas__lista}>
          {employeeList.map((val, key) => {
            return (
              <div className={stylesTema.paginas__lista__pagina} key={key}>
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

      {openModal
        && <Modal
          titulo='Adicione um funcionário'
          openModal={openModal}
          setOpenModal={setOpenModal}
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
            codFilial={codFilial}
            setCodFilial={setCodFilial}
            filiaisList={filiaisList}
          />
        </Modal>}
    </>
  )
}
