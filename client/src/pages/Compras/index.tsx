import Axios from 'axios';
import { ClienteSelection, FilialSelection, SaborSelection, Compra } from '../../types';
import ComprasForm from './ComprasForm';
import Modal from '../../components/Modal';
import stylesTema from '../../components/PaginaPadrao/PaginaPadrao.module.scss';
import { useEffect, useState } from 'react';
import Lista from '../../components/Lista';

export default function Compras() {
  const [quantidade, setQuantidade] = useState(0);
  const [codCliente, setCodCliente] = useState(0);
  const [codFilial, setCodFilial] = useState(0);
  const [codSabor, setCodSabor] = useState(0);

  const [id, setId] = useState(0);

  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const [comprasList, setComprasList] = useState<Compra[]>([]);
  const [clientesList, setClientesList] = useState<ClienteSelection[]>([]);
  const [filiaisList, setFiliaisList] = useState<FilialSelection[]>([]);
  const [saboresList, setSaboresList] = useState<SaborSelection[]>([]);

  const colunas: string[] = ['id', 'codcliente', 'precototal', 'datacompra'];

  function getCompras() {
    Axios.get('http://localhost:3001/compra/list').then((response) => {
      setComprasList(response.data);
    });
  }

  Axios.get('http://localhost:3001/compra/listClientes').then((response) => {
    setClientesList(response.data);
  });

  Axios.get('http://localhost:3001/compra/listFiliais').then((response) => {
    setFiliaisList(response.data);
  });

  useEffect(getCompras, [comprasList]);

  return (
    <>
      <div className={stylesTema.paginas}>
        <div className={stylesTema.paginas__botoes}>
          <button
            onClick={() => setOpenModal(true)}
            className={stylesTema.paginas__botoes__botao}
          >
            Adicionar nova compra
          </button>
          <button
            onClick={getCompras}
            className={stylesTema.paginas__botoes__botao}
          >
            Listar compras
          </button>
        </div>
        <div className={stylesTema.paginas__lista}>
          <Lista
            colunas={colunas}
            lista={comprasList}
            setLista={setComprasList}
            pagina='compra'
            setId={setId}
          />
        </div>
      </div>

      {openModal
        && <Modal
          titulo='Adicione uma compra'
          openModal={openModal}
          setOpenModal={setOpenModal}
        >
          <ComprasForm
            quantidade={quantidade}
            setQuantidade={setQuantidade}
            codCliente={codCliente}
            setCodCliente={setCodCliente}
            clientesList={clientesList}
            codFilial={codFilial}
            setCodFilial={setCodFilial}
            codSabor={codSabor}
            setCodSabor={setCodSabor}
            filiaisList={filiaisList}
            saboresList={saboresList}
            setSaboresList={setSaboresList}
            getCompras={getCompras}
          />
        </Modal>}
    </>
  );
}

