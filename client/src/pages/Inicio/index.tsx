import Donut from './Donut';
import stylesTema from '../../components/PaginaPadrao/PaginaPadrao.module.scss';
import styles from './Inicio.module.scss';

export default function Inicio() {
  return (
    <div className={stylesTema.paginas}>
      <div className={styles.donutbox}>
        <Donut />
      </div>
    </div>
  );
}