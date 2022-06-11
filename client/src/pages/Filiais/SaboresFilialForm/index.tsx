import Axios from 'axios';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import styles from '../../../styles/Formulario.module.scss';
import { SaborSelection, FilialSelection } from '../../../types';

export default function SaboresFilialForm() {
    const [codFilial, setCodFilial] = useState(0);
    const [codSabor, setCodSabor] = useState(0);

    const [filiaisList, setFiliaisList] = useState<FilialSelection[]>([]);
    const [saboresList, setSaboresList] = useState<SaborSelection[]>([]);

    function adicionarSaborFilial(evento: React.FormEvent<HTMLFormElement>) {
        evento.preventDefault();

        Axios.post("http://localhost:3001/filial/adicionaSaborFilial", {
            codFilial: codFilial,
            codSabor: codSabor
        }).then(() => {
            console.log("sucess");
        });
    }

    function getFiliais() {
        Axios.get("http://localhost:3001/compra/listFiliais").then((response) => {
            setFiliaisList(response.data);
        });
    }

    function getSabores() {
        Axios.get("http://localhost:3001/filial/listSabores").then((response) => {
            setSaboresList(response.data);
        });
    }

    getFiliais();
    getSabores();

    return (
        <form onSubmit={adicionarSaborFilial} className={styles.formulario}>
            <label htmlFor="filial">
                Filial
            </label>
            <Select
                className={styles.combobox}
                name="filial"
                placeholder="Selecione uma filial"
                value={filiaisList.find(obj => obj.value === codFilial)}
                options={filiaisList}
                onChange={(event) => {
                    setCodFilial(event!.value);
                }}
            />
            <label htmlFor="sabor">
                Sabor
            </label>
            <Select
                className={styles.combobox}
                name="sabor"
                placeholder="Selecione um sabor"
                value={saboresList.find(obj => obj.value === codSabor)}
                options={saboresList}
                onChange={(event) => {
                    setCodSabor(event!.value);
                }}
            />
            <button className={styles.botao} type="submit">
                Cadastrar sabor
            </button>
        </form>
    );
}