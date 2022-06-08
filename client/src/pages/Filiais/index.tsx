import { useState } from 'react';
import style from './Filiais.module.scss';
import Axios from 'axios';

interface Filial {
  codigo: number,
  nome: string,
  endereco: string
}

export default function FilialForm() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const [filialList, setFilialList] = useState<Filial[]>([]);

  const [newAddress, setNewAddress] = useState("");

  const addFilial = () => {
    Axios.post('http://localhost:3001/filial/create', {
      name: name,
      address: address
    }).then(() => {
      console.log("sucess");
    });
  }

  const getFiliais = () => {
    Axios.get('http://localhost:3001/filial/list').then((response) => {
      setFilialList(response.data);
    });
  }

  const updateAddress = (id: number) => {
    Axios.put('http://localhost:3001/filial/update', { address: newAddress, id: id }).then(
      (response) => {
        setFilialList(filialList.map((val) => {
          return val.codigo == id
            ? {
              codigo: val.codigo,
              nome: val.nome,
              endereco: newAddress
            }
            : val
        }))
      }
    );
  }

  const deleteFilial = (id: number) => {
    Axios.delete(`http://localhost:3001/filial/delete/${id}`).then((response) => {
      setFilialList(filialList.filter((val) => {
        return val.codigo != id
      }))
    });
  }

  return (
    <div className={style.App}>
      <div className={style.information}>
        <label>Name</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }} />
        <label>Address</label>
        <input
          type="text"
          onChange={(event) => {
            setAddress(event.target.value);
          }} />
        <button onClick={addFilial}>Add Filial</button>
      </div>
      <div className={style.filiais}>
        <button onClick={getFiliais}>Show Filiais</button>

        {filialList.map((val, key) => {
          return (
            <div className={style.filial} key={key}>
              <div>
                <h3>Name: {val.nome}</h3>
                <h3>Filial: {val.endereco}</h3>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="address"
                  onChange={(event) => {
                    setNewAddress(event.target.value);
                  }}
                />
                <button onClick={() => { updateAddress(val.codigo) }}>Update Address</button>
                <button onClick={() => { deleteFilial(val.codigo) }}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}
