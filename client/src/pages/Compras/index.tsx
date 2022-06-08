import { useState } from 'react';
import styles from './Compras.module.scss';
import Select from 'react-select';
import Axios from 'axios';

interface Compra {
    codigo: number,
    precototal: number,
    codcliente: number,
    datacompra: string
}

interface Cliente {
    value: number,
    label: string
}

export default function Compras() {
    const [precoTotal, setPrecoTotal] = useState(0);
    const [codCliente, setCodCliente] = useState(1);

    const [comprasList, setComprasList] = useState<Compra[]>([]);
    const [clientesList, setClientesList] = useState<Cliente[]>([]);

    const addCompra = () => {
        Axios.post('http://localhost:3001/compra/create', {
            precoTotal: precoTotal,
            codCliente: codCliente,
        }).then(() => {
            console.log("sucess");
        });
    }

    const getCompras = () => {
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

    const listClientes = () => {
        Axios.get('http://localhost:3001/compra/listClientes').then((response) => {
            setClientesList(response.data);
        });
    }

    listClientes();

    return (
        <div className={styles.App}>
            <div className={styles.information}>
                <label>Preco Total</label>
                <input
                    type="number"
                    onChange={(event) => {
                        setPrecoTotal(event.target.valueAsNumber);
                    }} />
                <label>Cliente</label>
                <Select
                    className={styles.combobox}
                    placeholder="Select Cliente"
                    value={clientesList.find(obj => obj.value === codCliente)}
                    options={clientesList}
                    onChange={(event) => {
                        setCodCliente(event!.value);
                    }}
                />
                <button onClick={addCompra}>Add Compra</button>
            </div>
            <div className={styles.compras}>
                <button onClick={getCompras}>Listar Compras</button>

                {comprasList.map((val, key) => {
                    return (
                        <div className={styles.compra} key={key}>
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
    );
}