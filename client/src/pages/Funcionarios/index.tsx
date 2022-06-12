import { useEffect, useState } from 'react';
import stylesTema from '../../components/PaginaPadrao/PaginaPadrao.module.scss';
import Axios from 'axios';
import Modal from '../../components/Modal';
import FuncionariosForm from './FuncionariosForm';
import { Funcionario, FilialSelection, StringNumber } from '../../types';
import UpdateForm from '../../components/UpdateForm';
import Lista from '../../components/Lista';

export default function Funcionarios() {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState(0);
  const [newSalary, setNewSalary] = useState<StringNumber>(0);
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

  const updateFuncionario = (codigo: number) => {
    Axios.put('http://localhost:3001/funcionario/update', {salary: newSalary, id: id}).then(
      (response) => {
        setEmployeeList(employeeList.map((val: Funcionario) => {
          return val.id == codigo
            ? {
              id: val.id,
              nome: val.nome,
              cpf: val.cpf,
              cargo: val.cargo,
              salario: newSalary as number,
              dataemissao: val.dataemissao,
              datasaida: val.datasaida,
              codfilial: val.codfilial
            }
            : val;
        }));
      }
    )
  }

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

      {openUpdateModal
        && <Modal
          titulo='Atualize o salário'
          openModal={openUpdateModal}
          setOpenModal={setOpenUpdateModal}
        >
          <UpdateForm
            label='Novo salário'
            type='number'
            setNewValue={setNewSalary}
            newValue={newSalary}
            submit={updateFuncionario}
            id={id}
            setOpenUpdateModal={setOpenUpdateModal}
          />
        </Modal>
      }
    </>
  )
}
