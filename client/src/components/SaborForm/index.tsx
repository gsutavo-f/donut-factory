import { useState } from 'react';
import 'normalize.css';
import './SaborForm.css';
import Axios from 'axios';

interface Sabor {
  nome: string,
  preco: number,
  ingrediente: string,
  tipo: number;
}

function SaborForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [ingredient, setIngredient] = useState("");
  const [type, setType] = useState(0);
  
  
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

  return (
    <div className="App">
      <div className="information">
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
        <input
          type="number"
          onChange={(event) => {
            setType(event.target.valueAsNumber);
          }} />
        <button onClick={addSabor}>Add Sabor</button>
      </div>
      <div className="flavors">
        <button onClick={getSabores}>Show Sabores</button>

        {saborList.map((val, key) => {
          return (
            <div className="flavor"key={key}>
              <h3>Name: {val.nome}</h3>
              <h3>Preço: {val.preco}</h3>
              <h3>Ingrediente: {val.ingrediente}</h3>
              <h3>Tipo: {val.tipo}</h3>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default SaborForm;
