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

app.post("/filial/create", (req, res) => {
    const name = req.body.name;
    const address = req.body.address;

    db.query(
        "insert into filial (nome, endereco) values (?,?)",
        [name, address],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
            }
        }
    );
});

app.get("/filial/list", (req, res) => {
    db.query(
        "select * from filial",
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
})

app.post('/sabor/create', (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const ingredient = req.body.ingredient;
    const type = req.body.type;

    db.query(
        "insert into sabordonut (nome, preco, ingrediente, tipo) values (?,?,?,?)",
        [name, price, ingredient, type],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
            }
        }
    );
});

app.get("/sabor/list", (req, res) => {
    db.query(
        "select * from sabordonut",
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.post('/cliente/create', (req, res) => {
  const name = req.body.name;
  const cpf = req.body.cpf;
  const phone = req.body.phone;
  const address = req.body.address;

  db.query(
      "insert into cliente (nome, cpf, telefone, endereco) values (?,?,?,?)",
      [name, cpf, phone, address],
      (err, result) => {
          if (err) {
              console.log(err);
          } else {
              res.send("Values Inserted");
          }
      }
  );
});

app.get("/cliente/list", (req, res) => {
  db.query(
      "select * from cliente",
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

