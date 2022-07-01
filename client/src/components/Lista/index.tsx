import styles from './Lista.module.scss';
import deleteIcon from './delete.png';
import editIcon from './edit.png';
import Axios from 'axios';

interface Props<T> {
  pagina: string;
  colunas: string[];
  lista: Array<any>;
  setLista: (value: React.SetStateAction<T[]>) => void
  setOpenUpdateModal?: React.Dispatch<React.SetStateAction<boolean>>;
  setId?: React.Dispatch<React.SetStateAction<number>>;
}

export default function Lista<T>({ colunas, lista, pagina, setOpenUpdateModal, setLista, setId }: Props<T>) {

  function deletaItem(codigo: number, pagina: string) {
    Axios.delete(`http://localhost:3001/${pagina}/${codigo}`).then(() => {
      setLista(lista.filter((val) => {
        return val.id != codigo
      }))
    });
  }

  function atualizaItem(codigo: number) {
    setId!(codigo);
    setOpenUpdateModal!(true);
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
                {item[`${coluna}`]
                }
              </td>
            ))}
            {setOpenUpdateModal &&
              <td className={styles.tabela__body__linha__icone}>
                <img src={editIcon} onClick={() => atualizaItem(item.id)}></img>
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