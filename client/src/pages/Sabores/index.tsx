import { useState } from 'react';
import Axios from 'axios';
import stylesTema from '../../components/PaginaPadrao/PaginaPadrao.module.scss';
import Modal from '../../components/Modal';
import SaboresForm from './SaboresForm';

interface Sabor {
  codigo: number,
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
  const [newPrice, setNewPrice] = useState(0);

  const [openModal, setOpenModal] = useState(false);

  const [saborList, setSaborList] = useState<Sabor[]>([]);

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

  const deleteSabor = (id: number) => {
    Axios.delete(`http://localhost:3001/sabor/delete/${id}`).then((response) => {
      setSaborList(saborList.filter((val) => {
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
            Adicionar novo sabor
          </button>
          <button
            onClick={getSabores}
            className={stylesTema.paginas__botoes__botao}
          >
            Listar sabores
          </button>
        </div>
        <div className={stylesTema.paginas__lista}>
          {saborList.map((val, key) => {
            return (
              <div className={stylesTema.paginas__lista__pagina} key={key}>
                <div>
                  <h3>Name: {val.nome}</h3>
                  <h3>Preço: {val.preco}</h3>
                  <h3>Ingrediente: {val.ingrediente}</h3>
                  <h3>Tipo: {val.tipo == 0 ? 'Doce' : 'Salgado'}</h3>
                </div>
                <div>
                  <input
                    type="number"
                    onChange={(event) => {
                      setNewPrice(event.target.valueAsNumber);
                    }}
                  />
                  <button onClick={() => { updatePrice(val.codigo) }}>Update Price</button>
                  <button onClick={() => { deleteSabor(val.codigo) }}>Delete</button>
                </div>
              </div>
            );
          })}
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
