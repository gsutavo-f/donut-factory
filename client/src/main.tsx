import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Funcionario from './pages/Funcionario';
import Filial from './pages/Filial';
import Sabor from './pages/Sabor';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/funcionario" element={<Funcionario />} />
        <Route path="/filial" element={<Filial />} />
        <Route path="/sabor" element={<Sabor />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
