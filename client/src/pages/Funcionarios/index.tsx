import { useEffect, useState } from 'react';
import stylesTema from '../../components/PaginaPadrao/PaginaPadrao.module.scss';
import Axios from 'axios';
import Modal from '../../components/Modal';
import FuncionariosForm from './FuncionariosForm';
import { FilialSelection } from '../../types';
import Lista from '../../components/Lista';

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

  const [id, setId] = useState(0);

  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const [filiaisList, setFiliaisList] = useState<FilialSelection[]>([]);
  const [employeeList, setEmployeeList] = useState<Funcionario[]>([]);

  const colunas: string[] = ['nome', 'cpf', 'cargo', 'salario'];

  const getEmployees = () => {
    Axios.get('http://localhost:3001/funcionario/list').then((response) => {
      setEmployeeList(response.data);
    });
  };

  Axios.get('http://localhost:3001/compra/listFiliais').then((response) => {
    setFiliaisList(response.data);
  });

  useEffect(getEmployees, [employeeList]);

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
        </div>
        <div className={stylesTema.paginas__lista}>
          <Lista
            colunas={colunas}
            lista={employeeList}
            setLista={setEmployeeList}
            setOpenUpdateModal={setOpenUpdateModal}
            pagina='funcionario'
            setId={setId}
          />
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

      {/* {openUpdateModal
        && <Modal
          titulo='Atualize o não sei ainda'
          openModal={openUpdateModal}
          setOpenModal={setOpenUpdateModal}
        >
          <UpdateForm
            label='Novo preço'
            type='number'
            setNewValue={setNewPrice}
            newValue={newPrice}
            submit={updatePrice}
            id={id}
            setOpenUpdateModal={setOpenUpdateModal}
          />
        </Modal>
      } */}
    </>
  )
}
