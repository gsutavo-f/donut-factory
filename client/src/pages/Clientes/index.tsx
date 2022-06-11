import Axios from 'axios';
import ClientesForm from './ClientesForm';
import Modal from '../../components/Modal';
import stylesTema from '../../components/PaginaPadrao/PaginaPadrao.module.scss';
import { useEffect, useState } from 'react';
import { StringNumber } from '../../types';
import Lista from '../../components/Lista';
import UpdateForm from '../../components/UpdateForm';

interface Cliente {
  id: number,
  nome: string,
  cpf: string,
  telefone: string,
  endereco: string,
  numcompras: number
}

export default function Clientes() {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const [id, setId] = useState(0);

  const [newPhone, setNewPhone] = useState<StringNumber>('');

  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const [clientList, setClientList] = useState<Cliente[]>([]);

  const colunas: string[] = ['nome', 'cpf', 'telefone', 'endereco'];

  const getClients = () => {
    Axios.get('http://localhost:3001/cliente/list').then((response) => {
      setClientList(response.data);
    });
  }

  const updatePhone = (codigo: number) => {
    Axios.put('http://localhost:3001/sabor/update', { phone: newPhone, id: id }).then(
      (response) => {
        setClientList(clientList.map((val: Cliente) => {
          return val.id == codigo
            ? {
              id: val.id,
              cpf: val.cpf,
              nome: val.nome,
              telefone: newPhone as string,
              endereco: val.endereco,
              numcompras: val.numcompras
            }
            : val
        }))
      }
    )
  }

  useEffect(getClients, [clientList]);

  return (
    <>
      <div className={stylesTema.paginas}>
        <div className={stylesTema.paginas__botoes}>
          <button
            onClick={() => setOpenModal(true)}
            className={stylesTema.paginas__botoes__botao}
          >
            Adicionar novo cliente
          </button>
          <button
            onClick={getClients}
            className={stylesTema.paginas__botoes__botao}
          >
            Listar clientes
          </button>
        </div>
        <div className={stylesTema.paginas__lista}>
          <Lista
            colunas={colunas}
            lista={clientList}
            setLista={setClientList}
            setOpenUpdateModal={setOpenUpdateModal}
            pagina='cliente'
            setId={setId}
          />
        </div>
      </div>

      {
        openModal
        && <Modal
          titulo='Adicione um cliente'
          openModal={openModal}
          setOpenModal={setOpenModal}
        >
          <ClientesForm
            name={name}
            setName={setName}
            cpf={cpf}
            setCpf={setCpf}
            phone={phone}
            setPhone={setPhone}
            address={address}
            setAddress={setAddress}
          />
        </Modal>}

      {openUpdateModal
        && <Modal
          titulo='Atualize o telefone'
          openModal={openUpdateModal}
          setOpenModal={setOpenUpdateModal}
        >
          <UpdateForm
            label='Novo telefone'
            type='text'
            setNewValue={setNewPhone}
            newValue={newPhone}
            submit={updatePhone}
            id={id}
            setOpenUpdateModal={setOpenUpdateModal}
          />
        </Modal>}
    </>
  );
}