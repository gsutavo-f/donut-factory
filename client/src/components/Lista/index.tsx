import styles from './Lista.module.scss';
import deleteIcon from './delete.png';
import editIcon from './edit.png';
import Axios from 'axios';

interface Props<T> {
  pagina: string;
  colunas: string[];
  lista: Array<any>;
  setLista: (value: React.SetStateAction<T[]>) => void
  update?: (id: number) => void;
}

export default function Lista<T>({ colunas, lista, pagina, update, setLista }: Props<T>) {

  function deletaItem(codigo: number, pagina: string) {
    Axios.delete(`http://localhost:3001/${pagina}/delete/${codigo}`).then((response) => {
      setLista(lista.filter((val) => {
        return val.id != codigo
      }))
    });
  }

  return (
    <table className={styles.tabela}>
      <thead className={styles.tabela__header}>
        <tr>
          {colunas.map((coluna, index) => (
            <th key={index} className={styles.tabela__header__linha}> {coluna}</th>
          ))}
        </tr>
      </thead>
      <tbody className={styles.tabela__body}>
        {lista.map((item, index) => (
          <tr key={index} className={styles.tabela__body__linha}>
            {colunas.map((coluna, key) => (
              <td key={key} className={styles.tabela__body__linha__info}>
                {coluna == 'tipo'
                  && `${pagina}` == 'sabor' ?
                  item[`${coluna}`] == 0 ? 'doce' : 'salgado'
                  : item[`${coluna}`]
                }
              </td>
            ))}
              {`${update}` != undefined &&
                <td className={styles.tabela__body__linha__icone}>
                  <img src={editIcon} onClick={() => update!(item.id)}></img>
                </td>
              }
              <td className={styles.tabela__body__linha__icone}>
                <img src={deleteIcon} onClick={() => deletaItem(item.id, pagina)}></img>
              </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}