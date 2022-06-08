import { useState } from 'react';
import stylesTema from '../../components/PaginaPadrao/PaginaPadrao.module.scss';
import Axios from 'axios';
import Modal from '../../components/Modal';
import FiliaisForm from './FiliaisForm';

interface Filial {
  codigo: number,
  nome: string,
  endereco: string
}

export default function Filiais() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const [openModal, setOpenModal] = useState(false);

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
    <>
      <div className={stylesTema.paginas}>
        <div className={stylesTema.paginas__botoes}>
          <button
            onClick={() => setOpenModal(true)}
            className={stylesTema.paginas__botoes__botao}
          >
            Adicionar nova filial
          </button>
          <button
            onClick={getFiliais}
            className={stylesTema.paginas__botoes__botao}
          >
            Listar filiais
          </button>
        </div>
        <div className={stylesTema.paginas__lista}>
          {filialList.map((val, key) => {
            return (
              <div className={stylesTema.paginas__lista__pagina} key={key}>
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

      {openModal
        && <Modal
          titulo='Adicione uma filial'
          openModal={openModal}
          setOpenModal={setOpenModal}
        >
          <FiliaisForm
            name={name}
            setName={setName}
            address={address}
            setAddress={setAddress}
          />
        </Modal>}
    </>
  )
}
