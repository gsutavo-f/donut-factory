import Axios from 'axios';
import Select from 'react-select';
import styles from '../../../styles/Formulario.module.scss';

interface ISaboresForm {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  price: number;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  ingredient: string;
  setIngredient: React.Dispatch<React.SetStateAction<string>>;
  type: number;
  setType: React.Dispatch<React.SetStateAction<number>>;
}

export default function SaboresForm(
  { name, setName,
    price, setPrice,
    ingredient, setIngredient,
    type, setType }: ISaboresForm) {

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

  function adicionarSabor(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    Axios.post('http://localhost:3001/sabor/create', {
      name: name,
      price: price,
      ingredient: ingredient,
      type: type
    }).then(() => {
      console.log("sucess");
    });
  }

  return (
    <form onSubmit={adicionarSabor} className={styles.formulario}>
      <label htmlFor="nome">
        Nome
      </label>
      <input
        type="text"
        name="nome"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
      />
      <label htmlFor="preco">
        Preço
      </label>
      <input
        type="number"
        name="preco"
        value={price}
        onChange={(event) => setPrice(event.target.valueAsNumber)}
        required
      />
      <label htmlFor="ingrediente">
        Ingrediente
      </label>
      <input
        type="text"
        name="ingrediente"
        value={ingredient}
        onChange={(event) => setIngredient(event.target.value)}
        required
      />
      <label htmlFor="tipo">
        Tipo
      </label>
      <Select
        className={styles.combobox}
        name="tipo"
        value={tipos.find(obj => obj.value === type)}
        options={tipos}
        onChange={(event) => {
          setType(event!.value);
        }}
      />
      <button className={styles.botao} type="submit">
        Adicionar sabor
      </button>
    </form>
  );

}