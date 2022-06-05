import { useState } from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState(0);
  const [filial, setFilial] = useState(0);

  const addFuncionario = () => {
    Axios.post('http://localhost:3001/create', {
      name: name,
      cpf: cpf,
      position: position,
      salary: salary,
      filial: filial
    }).then(() => {
      console.log("sucess");
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
    </div>
  )
}

export default App
