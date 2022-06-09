import { Link } from 'react-router-dom';
import styles from './Menu.module.scss';

export default function Menu() {
  const rotas = [{
    label: 'Filiais',
    to: '/filial'
  }, {
    label: 'Sabores',
    to: '/sabor'
  }, {
    label: 'Funcionários',
    to: '/funcionario'
  }, {
    label: 'Clientes',
    to: '/cliente'
  }, {
    label: 'Compras',
    to: '/compra'
  }];

  return (
    <header>
      <nav className={styles.menu}>
        <div className={styles.logo}>
          <Link to={'/'}>
            Loja de Donuts
          </Link>
        </div>
        <ul className={styles.menu__list}>
          {rotas.map((rota, index) => (
            <li key={index} className={styles.menu__link}>
              <Link to={rota.to}>
                {rota.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}