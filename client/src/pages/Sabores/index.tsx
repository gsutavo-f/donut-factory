import { useState } from 'react';
import styles from './Sabores.module.scss';
import Axios from 'axios';
import Select from 'react-select';

interface Sabor {
  codigo: number,
  nome: string,
  preco: number,
  numvendas: number,
  ingrediente: string,
  tipo: number;
}

const tipos = [
  {
    value: 0,
    label: "Doce"
  },
  {
    value: 1,
    label: "Salgado"
  }
]

export default function Sabores() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [ingredient, setIngredient] = useState("");
  const [type, setType] = useState(0);
  const [newPrice, setNewPrice] = useState(0);

  const [saborList, setSaborList] = useState<Sabor[]>([]);

  const addSabor = () => {
    Axios.post('http://localhost:3001/sabor/create', {
      name: name,
      price: price,
      ingredient: ingredient,
      type: type
    }).then(() => {
      console.log("sucess");
    });
  };

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
    <div className={styles.App}>
      <div className={styles.information}>
        <label>Name</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }} />
        <label>Price</label>
        <input
          type="number"
          onChange={(event) => {
            setPrice(event.target.valueAsNumber);
          }} />
        <label>Ingredient</label>
        <input
          type="text"
          onChange={(event) => {
            setIngredient(event.target.value);
          }} />
        <label>Type</label>
        <Select
          className={styles.combobox}
          placeholder="Select type"
          value={tipos.find(obj => obj.value === type)}
          options={tipos}
          onChange={(event) => {
            setType(event!.value);
          }}
        />
        <button onClick={addSabor}>Add Sabor</button>
      </div>
      <div className={styles.flavors}>
        <button onClick={getSabores}>Show Sabores</button>

        {saborList.map((val, key) => {
          return (
            <div className={styles.flavor} key={key}>
              <div>
                <h3>Name: {val.nome}</h3>
                <h3>Preço: {val.preco}</h3>
                <h3>Ingrediente: {val.ingrediente}</h3>
                <h3>Tipo: {val.tipo}</h3>
              </div>
              <div>
                <input
                  type="number"
                  placeholder="price"
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
    </div >
  )
}
