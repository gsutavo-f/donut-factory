import { useState } from 'react';
import styles from './Clientes.module.scss';
import Axios from 'axios';

interface Cliente {
  codigo: number,
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

  const [clientList, setClientList] = useState<Cliente[]>([]);

  const addClient = () => {
    Axios.post('http://localhost:3001/cliente/create', {
      name: name,
      cpf: cpf,
      phone: phone,
      address: address
    }).then(() => {
      console.log('sucess');
    });
  }

  const getClients = () => {
    Axios.get('http://localhost:3001/cliente/list').then((response) => {
      setClientList(response.data);
    });
  }

  const updatePhone = (id: number) => {
    Axios.put('http://localhost:3001/sabor/update', { phone: newPhone, id: id }).then(
      (response) => {
        setClientList(clientList.map((val) => {
          return val.codigo == id
            ? {
              codigo: val.codigo,
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
      setClientList(clientList.filter((val) => {
        return val.codigo != id
      }))
    });
  }

  return (
    <div className={styles.App}>
      <div className={styles.information}>
        <label>Name</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }} />
        <label>Document</label>
        <input
          type="text"
          onChange={(event) => {
            setCpf(event.target.value);
          }} />
        <label>Phone</label>
        <input
          type="text"
          onChange={(event) => {
            setPhone(event.target.value);
          }} />
        <label>Address</label>
        <input
          type="text"
          onChange={(event) => {
            setAddress(event.target.value);
          }} />
        <button onClick={addClient}>Add Client</button>
      </div>
      <div className={styles.clients}>
        <button onClick={getClients}>Show Clients</button>

        {clientList.map((val, key) => {
          return (
            <div className={styles.client} key={key}>
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
                <button onClick={() => { updatePhone(val.codigo) }}>Update Phone</button>
                <button onClick={() => { deleteCliente(val.codigo) }}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}
