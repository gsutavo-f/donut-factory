import { useEffect, useState } from 'react';
import Axios from 'axios';
import stylesTema from '../../components/PaginaPadrao/PaginaPadrao.module.scss';
import Modal from '../../components/Modal';
import SaboresForm from './SaboresForm';
import Lista from '../../components/Lista';

interface Sabor {
  codigo: number,
  nome: string,
  preco: number,
  numvendas: number,
  ingrediente: string,
  tipo: number | string;
}

export default function Sabores() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0.0);
  const [ingredient, setIngredient] = useState("");
  const [type, setType] = useState(0);
  const [newPrice, setNewPrice] = useState(0);

  const [openModal, setOpenModal] = useState(false);

  const [saborList, setSaborList] = useState<Sabor[]>([]);

  const colunas: string[] = ['nome', 'preco', 'ingrediente', 'tipo'];

  const getSabores = () => {
    Axios.get('http://localhost:3001/sabor/list').then((response) => {
      setSaborList(response.data);
    });
  };

  const updatePrice = (id: number) => {
    Axios.put('http://localhost:3001/sabor/update', { price: newPrice, id: id }).then(
      (response) => {
        setSaborList(saborList.map((val) => {
          return val.codigo == id
            ? {
              codigo: val.codigo,
              nome: val.nome,
              preco: newPrice,
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
            onClick={() => setOpenModal(true)}
            className={stylesTema.paginas__botoes__botao}
          >
            Adicionar novo sabor
          </button>

        </div>
        <div className={stylesTema.paginas__lista}>

          {saborList.length > 0 ? (
          <Lista
            colunas={colunas}
            lista={saborList}
            setLista={setSaborList}
            update={updatePrice}
            pagina='sabor'
          />
          ) : (
          <div className={stylesTema.paginas__lista__vazia}>
            adicione um sabor
          </div>
          )}

        </div>
      </div>

      {openModal
        && <Modal
          titulo='Adicione um sabor'
          openModal={openModal}
          setOpenModal={setOpenModal}
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
    </>
  );
}
