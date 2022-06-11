import Axios from 'axios';
import { ClienteSelection, FilialSelection, SaborSelection, Compra } from '../../types';
import ComprasForm from './ComprasForm';
import Modal from '../../components/Modal';
import stylesTema from '../../components/PaginaPadrao/PaginaPadrao.module.scss';
import { useEffect, useState } from 'react';

export default function Compras() {
  const [precoTotal, setPrecoTotal] = useState(0);
  const [codCliente, setCodCliente] = useState(0);
  const [codFilial, setCodFilial] = useState(0);
  const [codSabor, setCodSabor] = useState(0);

  const [openModal, setOpenModal] = useState(false);

  const [comprasList, setComprasList] = useState<Compra[]>([]);
  const [clientesList, setClientesList] = useState<ClienteSelection[]>([]);
  const [filiaisList, setFiliaisList] = useState<FilialSelection[]>([]);
  const [saboresList, setSaboresList] = useState<SaborSelection[]>([]);

  useEffect(() => {
    getCompras();
  }, [comprasList])

  function getCompras() {
    Axios.get('http://localhost:3001/compra/list').then((response) => {
      setComprasList(response.data);
    });
  }

  const deleteCompra = (id: number) => {
    Axios.delete(`http://localhost:3001/compra/delete/${id}`).then((response) => {
      setComprasList(comprasList.filter((val) => {
        return val.codigo != id
      }))
    });
  }

  Axios.get('http://localhost:3001/compra/listClientes').then((response) => {
    setClientesList(response.data);
  });

  Axios.get('http://localhost:3001/compra/listFiliais').then((response) => {
    setFiliaisList(response.data);
  });


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
          {comprasList.map((val, key) => {
            return (
              <div className={stylesTema.paginas__lista__pagina} key={key}>
                <div>
                  <h3>Valor: {val.precototal}</h3>
                  <h3>Cliente: {val.codcliente}</h3>
                  <h3>Data: {val.datacompra}</h3>
                </div>
                <div>
                  <button onClick={() => { deleteCompra(val.codigo) }}>Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {openModal
        && <Modal
          titulo='Adicione uma compra'
          openModal={openModal}
          setOpenModal={setOpenModal}
        >
          <ComprasForm
            precoTotal={precoTotal}
            setPrecoTotal={setPrecoTotal}
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

