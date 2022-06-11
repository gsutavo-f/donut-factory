import { useEffect, useState } from 'react';
import stylesTema from '../../components/PaginaPadrao/PaginaPadrao.module.scss';
import Axios from 'axios';
import Modal from '../../components/Modal';
import FiliaisForm from './FiliaisForm';
import SaboresFilialForm from './SaboresFilialForm';
import { Filial, StringNumber } from '../../interfaces';
import UpdateForm from '../../components/UpdateForm';
import Lista from '../../components/Lista';

export default function Filiais() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const [id, setId] = useState(0);

  const [newAddress, setNewAddress] = useState<StringNumber>("");

  const [openModalNewFilial, setOpenModalNewFilial] = useState(false);
  const [openModalSaboresFilial, setOpenModalSaboresFilial] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const [filialList, setFilialList] = useState<Filial[]>([]);

  const colunas: string[] = ['nome', 'endereco'];

  const getFiliais = () => {
    Axios.get('http://localhost:3001/filial/list').then((response) => {
      setFilialList(response.data);
    });
  }

  const updateAddress = (codigo: number) => {
    Axios.put('http://localhost:3001/filial/update', { address: newAddress, id: id }).then(
      (response) => {
        setFilialList(filialList.map((val) => {
          return val.id == codigo
            ? {
              id: val.id,
              nome: val.nome,
              endereco: newAddress as string
            }
            : val
        }))
      }
    );
  }

  useEffect(getFiliais, [filialList]);

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
        </div>
        <div className={stylesTema.paginas__lista}>
          {filialList.length > 0 ? (
            <Lista
              colunas={colunas}
              lista={filialList}
              setLista={setFilialList}
              setOpenUpdateModal={setOpenUpdateModal}
              pagina='filial'
              setId={setId}
            />
          ) : (
            <div className={stylesTema.paginas__lista__vazia}>
              Adicione uma filial
            </div>
          )}
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
          titulo='Adicione um sabor'
          openModal={openModalSaboresFilial}
          setOpenModal={setOpenModalSaboresFilial}
        >
          <SaboresFilialForm />
        </Modal>
      }

      {openUpdateModal
        && <Modal
          titulo='Atualize o endereço'
          openModal={openUpdateModal}
          setOpenModal={setOpenUpdateModal}
        >
          <UpdateForm
            label='Novo endereço'
            type='text'
            setNewValue={setNewAddress}
            newValue={newAddress}
            submit={updateAddress}
            id={id}
            setOpenUpdateModal={setOpenUpdateModal}
          />
        </Modal>
      }
    </>
  )
}
