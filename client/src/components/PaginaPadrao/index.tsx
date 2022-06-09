import styles from './PaginaPadrao.module.scss';
import { Outlet } from 'react-router-dom';

export default function PaginaPadrao() {
  return (
    <>
      <div
        className={styles.container}
        onDragStart={(e) => e.preventDefault()}
      >
        <Outlet />
      </div>
    </>
  );
}