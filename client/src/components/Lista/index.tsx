import styles from './Lista.module.scss';

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
            <th key={index}> {coluna}</th>
          ))}
        </tr>
      </thead>
      <tbody className={styles.tabela__body}>
        {lista.map((item, index) => (
          <tr key={index}>
            {colunas.map((coluna, key) => (
              <td key={key}>
                {coluna == 'tipo'
                  && `${pagina}` == 'sabores' ?
                  item[`${coluna}`] == 0 ? 'doce' : 'salgado'
                  : item[`${coluna}`]
                }
              </td>
            ))}
            <td>
              <button onClick={() => apagar(item.codigo)}>apagar</button>
            </td>
            {`${update}` != undefined &&
              <td>
                <button onClick={() => update!(item.codigo)}>update</button>
              </td>
            }
          </tr>
        ))}
      </tbody>
    </table>
  );
}