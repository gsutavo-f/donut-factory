import 'normalize.css';
import './Cabeca.css';
import { Link } from "react-router-dom";

export default function Cabeca() {
    return (
        <header className="header">
        <nav>
          <div className="logo">
            Loja de Donuts
          </div>
          <ul className="navegacao">
            <li><Link to="/filial">Filiais</Link></li>
            <li><Link to="/sabor">Sabores</Link></li>
            <li><Link to="/funcionario">Funcionários</Link></li>
            <li><Link to="/cliente">Clientes</Link></li>
            <li><Link to="/compra">Compras</Link></li>
          </ul>
        </nav>
      </header>
    );
}