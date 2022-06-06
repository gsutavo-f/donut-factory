import { useState } from 'react';
import 'normalize.css';
import './FuncionarioForm.css';
import Axios from 'axios';

interface Funcionario {
  nome: string,
  cpf: string,
  cargo: string,
  salario: number,
  codfilial: number
}

function FuncionarioForm() {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState(0);
  const [filial, setFilial] = useState(0);

  const [employeeList, setEmployeeList] = useState<Funcionario[]>([]);

  const addFuncionario = () => {
    Axios.post('http://localhost:3001/funcionario/create', {
      name: name,
      cpf: cpf,
      position: position,
      salary: salary,
      filial: filial
    }).then(() => {
      console.log("sucess");
    });
  };

  const getEmployees = () => {
    Axios.get('http://localhost:3001/funcionario/list').then((response) => {
      setEmployeeList(response.data);
    });
  };

  return (
    <div className="App">
      <div className="information">
        <label>Name</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }} />
        <label>Document</label>
        <input
          type="text"
          onChange={(event) => {
            setCpf(event.target.value);
          }} />
        <label>Position</label>
        <input
          type="text"
          onChange={(event) => {
            setPosition(event.target.value);
          }} />
        <label>Salary</label>
        <input
          type="number"
          onChange={(event) => {
            setSalary(event.target.valueAsNumber);
          }} />
        <label>Filial</label>
        <input
          type="number"
          onChange={(event) => {
            setFilial(event.target.valueAsNumber);
          }} />
        <button onClick={addFuncionario}>Add Employee</button>
      </div>
      <div className="employees">
        <button onClick={getEmployees}>Show Employees</button>

        {employeeList.map((val, key) => {
          return (
            <div className="employee">
              <h3>Name: {val.nome}</h3>
              <h3>Document: {val.cpf}</h3>
              <h3>Position: {val.cargo}</h3>
              <h3>Salary: {val.salario}</h3>
              <h3>Filial: {val.codfilial}</h3>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default FuncionarioForm
