import { useState } from 'react';
import stylesTema from '../../components/PaginaPadrao/PaginaPadrao.module.scss';
import Axios from 'axios';
import Modal from '../../components/Modal';
import FiliaisForm from './FiliaisForm';

interface Filial {
  nome: string,
  endereco: string
}

export default function Filiais() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const [filialList, setFilialList] = useState<Filial[]>([]);

  const getFiliais = () => {
    Axios.get('http://localhost:3001/filial/list').then((response) => {
      setFilialList(response.data);
    });
  };

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
                <h3>Name: {val.nome}</h3>
                <h3>Filial: {val.endereco}</h3>
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
