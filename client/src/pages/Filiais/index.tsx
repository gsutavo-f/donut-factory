import { useState } from 'react';
import stylesTema from '../../components/PaginaPadrao/PaginaPadrao.module.scss';
import Axios from 'axios';
import Modal from '../../components/Modal';
import FiliaisForm from './FiliaisForm';
import SaboresFilialForm from './SaboresFilialForm';
import { Filial } from '../../interfaces';

export default function Filiais() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const [openModalNewFilial, setOpenModalNewFilial] = useState(false);
  const [openModalSaboresFilial, setOpenModalSaboresFilial] = useState(false);

  const [filialList, setFilialList] = useState<Filial[]>([]);
  const [newAddress, setNewAddress] = useState("");

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

  Axios.get("")

  return (
    <>
      <div className={stylesTema.paginas}>
        <div className={stylesTema.paginas__botoes}>
          <button
            onClick={() => setOpenModalNewFilial(true)}
            className={stylesTema.paginas__botoes__botao}
          >
            Adicionar nova filial
          </button>
          <button
            onClick={() => setOpenModalSaboresFilial(true)}
            className={stylesTema.paginas__botoes__botao}
          >
            Adicionar Sabor
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

      {openModalNewFilial
        && <Modal
          titulo='Adicione uma filial'
          openModal={openModalNewFilial}
          setOpenModal={setOpenModalNewFilial}
        >
          <FiliaisForm
            name={name}
            setName={setName}
            address={address}
            setAddress={setAddress}
          />
        </Modal>}

        {openModalSaboresFilial
          && <Modal
            titulo='Cadastre um sabor'
            openModal={openModalSaboresFilial}
            setOpenModal={setOpenModalSaboresFilial}
          >
            <SaboresFilialForm />
          </Modal>
        }
    </>
  )
}
