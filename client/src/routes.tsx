import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import PaginaPadrao from './components/PaginaPadrao';
import Inicio from './pages/Inicio';
import Filiais from './pages/Filiais';
import Sabores from './pages/Sabores';
import Funcionarios from './pages/Funcionarios';
import Clientes from './pages/Clientes';
import Compras from './pages/Compras';

export default function AppRouter() {
  return (
    <main>
      <Router>
        <Menu />
        <Routes>
          <Route path='/' element={<PaginaPadrao />}>
            <Route index element={<Inicio />} />
            <Route path='filial' element={<Filiais />} />
            <Route path='sabor' element={<Sabores />} />
            <Route path='funcionario' element={<Funcionarios />} />
            <Route path='cliente' element={<Clientes />} />
            <Route path='compra' element={<Compras />} />
          </Route>
        </Routes>
      </Router>
    </main>
  );
}