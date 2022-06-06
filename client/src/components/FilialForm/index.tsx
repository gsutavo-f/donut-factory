import { useState } from 'react';
import 'normalize.css';
import './FilialForm.css';
import Axios from 'axios';

interface Filial {
  nome: string,
  endereco: string
}

function FuncionarioForm() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const [filialList, setFilialList] = useState<Filial[]>([]);

  const addFilial = () => {
    Axios.post('http://localhost:3001/filial/create', {
      name: name,
      address: address
    }).then(() => {
      console.log("sucess");
    });
  };

  const getFiliais = () => {
    Axios.get('http://localhost:3001/filial/list').then((response) => {
        setFilialList(response.data);
    });
  };

  return (
    <div className="App">
      <div className="information">
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
      <div className="filiais">
        <button onClick={getFiliais}>Show Filiais</button>

        {filialList.map((val, key) => {
          return (
            <div className="filial"key={key}>
              <h3>Name: {val.nome}</h3>
              <h3>Filial: {val.endereco}</h3>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default FuncionarioForm
