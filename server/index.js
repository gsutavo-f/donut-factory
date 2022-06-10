const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const PORT = 3001;

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
});

app.put("/filial/update", (req, res) => {
    const address = req.body.address;
    const id = req.body.id;
    db.query(
        "update filial set endereco = ? where id = ?",
        [address, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.delete("/filial/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query(
        "delete from filial where id = ?",
        id,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

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

app.put("/sabor/update", (req, res) => {
    const id = req.body.id;
    const price = req.body.price;
    db.query(
        "update sabordonut set preco = ? where id = ?",
        [price, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.delete("/sabor/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query(
        "delete from sabordonut where id = ?",
        id,
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

app.put("/cliente/update", (req, res) => {
    const id = req.body.id;
    const phone = req.body.phone;
    db.query(
        "update cliente set telefone = ? where id = ?",
        [phone, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.delete("/cliente/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query(
        "delete from cliente where id = ?",
        id,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.post('/compra/create', (req, res) => {
    const precototal = req.body.precoTotal;
    const codcliente = req.body.codCliente;
    const codFilial = req.body.codFilial;

    db.query(
        "insert into compra (precototal, datacompra, codcliente) values (?,?,?)",
        [precototal, new Date(), codcliente],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                let codCompra = result.insertId;
                db.query(
                    "insert into filial_compra (codfilial, codcompra) values (?,?)",
                    [codFilial, codCompra],
                    (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                    }
                );
            }
        }
    );

    db.query(
        "update cliente set numcompras = numcompras + 1 where cliente.id = ?",
        codcliente,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
            }
        }
    );
});

app.get('/compra/list', (req, res) => {
    db.query(
        "select * from compra",
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.delete("/compra/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query(
        "delete from compra where id = ?",
        id,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.get("/compra/listClientes", (req, res) => {
    db.query(
        "select id as value, nome as label from cliente",
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    )
});

app.get("/compra/listFiliais", (req, res) => {
    db.query(
        "select id as value, nome as label from filial",
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    )
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

