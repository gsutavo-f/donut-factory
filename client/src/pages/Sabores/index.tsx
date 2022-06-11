import { useEffect, useState } from 'react';
import Axios from 'axios';
import stylesTema from '../../components/PaginaPadrao/PaginaPadrao.module.scss';
import Modal from '../../components/Modal';
import SaboresForm from './SaboresForm';
import Lista from '../../components/Lista';
import UpdateForm from '../../components/UpdateForm';
import { StringNumber } from '../../types';


interface Sabor {
  id: number,
  nome: string,
  preco: number,
  numvendas: number,
  ingrediente: string,
  tipo: number;
}

export default function Sabores() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0.0);
  const [ingredient, setIngredient] = useState("");
  const [type, setType] = useState(0);

  const [id, setId] = useState(0);

  const [newPrice, setNewPrice] = useState<StringNumber>(0);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const [saborList, setSaborList] = useState<Sabor[]>([]);

  const colunas: string[] = ['nome', 'preco', 'ingrediente', 'tipo'];

  const getSabores = () => {
    Axios.get('http://localhost:3001/sabor/list').then((response) => {
      setSaborList(response.data.map((val: Sabor) => {
        return {
          id: val.id,
          nome: val.nome,
          preco: val.preco,
          numvendas: val.numvendas,
          ingrediente: val.ingrediente,
          tipo: val.tipo == 0 ? 'doce' : 'salgado'
        }
      }));
    });
  };

  const updatePrice = (codigo: number) => {
    Axios.put('http://localhost:3001/sabor/update', { price: newPrice, id: id }).then(
      (response) => {
        setSaborList(saborList.map((val) => {
          return val.id == codigo
            ? {
              id: val.id,
              nome: val.nome,
              preco: newPrice as number,
              numvendas: val.numvendas,
              ingrediente: val.ingrediente,
              tipo: val.tipo
            }
            : val
        }))
      }
    )
  }

  useEffect(getSabores, [saborList]);

  return (
    <>
      <div className={stylesTema.paginas}>
        <div className={stylesTema.paginas__botoes}>
          <button
            onClick={() => setOpenAddModal(true)}
            className={stylesTema.paginas__botoes__botao}
          >
            Adicionar novo sabor
          </button>

        </div>
        <div className={stylesTema.paginas__lista}>

          <Lista
            colunas={colunas}
            lista={saborList}
            setLista={setSaborList}
            setOpenUpdateModal={setOpenUpdateModal}
            pagina='sabor'
            setId={setId}
          />


        </div>
      </div>

      {openAddModal
        && <Modal
          titulo='Adicione um sabor'
          openModal={openAddModal}
          setOpenModal={setOpenAddModal}
        >
          <SaboresForm
            name={name}
            setName={setName}
            price={price}
            setPrice={setPrice}
            ingredient={ingredient}
            setIngredient={setIngredient}
            type={type}
            setType={setType}
          />
        </Modal>}

      {openUpdateModal
        && <Modal
          titulo='Atualize o preço'
          openModal={openUpdateModal}
          setOpenModal={setOpenUpdateModal}
        >
          <UpdateForm
            label='Novo preço'
            type='number'
            setNewValue={setNewPrice}
            newValue={newPrice}
            submit={updatePrice}
            id={id}
            setOpenUpdateModal={setOpenUpdateModal}
          />
        </Modal>
      }
    </>
  );
}
