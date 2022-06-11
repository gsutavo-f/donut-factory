import styles from './Lista.module.scss';
import deleteIcon from './delete.png';
import editIcon from './edit.png';

interface Props {
  pagina?: string;
  colunas: string[];
  lista: Array<any>;
  apagar: (id: number) => void;
  update?: (id: number) => void;
}

export default function Lista({ colunas, lista, apagar, pagina, update }: Props) {

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
                  && `${pagina}` == 'sabores' ?
                  item[`${coluna}`] == 0 ? 'doce' : 'salgado'
                  : item[`${coluna}`]
                }
              </td>
            ))}
            <div className={styles.tabela__body__linha__icones}>
              {`${update}` != undefined &&
                <td>
                  <img src={editIcon} onClick={() => update!(item.id)}></img>
                </td>
              }
              <td>
                <img src={deleteIcon} onClick={() => apagar(item.id)}></img>
              </td>
            </div>
          </tr>
        ))}
      </tbody>
    </table>
  );
}