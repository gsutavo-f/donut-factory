const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'donuts'
});

app.post('/funcionario/create', (req, res) => {
    const name = req.body.name;
    const cpf = req.body.cpf;
    const position = req.body.position;
    const salary = req.body.salary;
    const filial = req.body.filial;

    db.query(
        "insert into funcionario (nome, cpf, cargo, salario, codfilial, dataemissao) values (?,?,?,?,?,?)",
        [name, cpf, position, salary, filial, new Date()],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
            }
        }
    );
});

app.get("/funcionario/list", (req, res) => {
    db.query(
        "select * from funcionario",
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.listen(3001, () => {
    console.log("Running...");
});

