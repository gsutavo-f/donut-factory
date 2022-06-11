import Axios from 'axios';
import ClientesForm from './ClientesForm';
import Modal from '../../components/Modal';
import stylesTema from '../../components/PaginaPadrao/PaginaPadrao.module.scss';
import { useState } from 'react';

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
  const [newPhone, setNewPhone] = useState('');

  const [openModal, setOpenModal] = useState(false);

  const [clientList, setClientList] = useState<Cliente[]>([]);

  const getClients = () => {
    Axios.get('http://localhost:3001/cliente/list').then((response) => {
      setClientList(response.data);
    });
  }

  const updatePhone = (id: number) => {
    Axios.put('http://localhost:3001/sabor/update', { phone: newPhone, id: id }).then(
      (response) => {
        setClientList(clientList.map((val: Cliente) => {
          return val.id == id
            ? {
              id: val.id,
              cpf: val.cpf,
              nome: val.nome,
              telefone: newPhone,
              endereco: val.endereco,
              numcompras: val.numcompras
            }
            : val
        }))
      }
    )
  }

  const deleteCliente = (id: number) => {
    Axios.delete(`http://localhost:3001/cliente/delete/${id}`).then((response) => {
      setClientList(clientList.filter((val: Cliente) => {
        return val.id != id
      }))
    });
  }

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
          {clientList.map((val, key) => {
            return (
              <div className={stylesTema.paginas__lista__pagina} key={key}>
                <div>
                  <h3>Name: {val.nome}</h3>
                  <h3>Document: {val.cpf}</h3>
                  <h3>Phone: {val.telefone}</h3>
                  <h3>Address: {val.endereco}</h3>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="phone"
                    onChange={(event) => {
                      setNewPhone(event.target.value);
                    }}
                  />
                  <button onClick={() => { updatePhone(val.id) }}>Update Phone</button>
                  <button onClick={() => { deleteCliente(val.id) }}>Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {openModal
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
    </>
  );
}