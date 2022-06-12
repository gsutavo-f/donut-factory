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

app.put("/funcionario/update", (req, res) => {
    const salary = req.body.salary;
    const id = req.body.id;

    db.query(
        "update funcionario set salario = ? where id = ?",
        [salary, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.delete("/funcionario/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query(
        "delete from funcionario where id = ?",
        id,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
})

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
        "delete from funcionario where codfilial = ?",
        id,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                db.query(
                    "delete from filial_sabordonut where codfilial = ?",
                    id,
                    (err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            db.query(
                                "delete from filial_compra where codfilial = ?",
                                id,
                                (err, result) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
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
                                    }
                                }
                            )
                        }
                    }
                )
            }
        }
    )
    
});

app.get("/filial/listSabores", (req, res) => {
    db.query(
        "select id as value, nome as label from sabordonut",
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.post("/filial/adicionaSaborFilial", (req, res) => {
    const codFilial = req.body.codFilial;
    const codSabor = req.body.codSabor;

    db.query(
        "insert into filial_sabordonut (codfilial, codsabor) values (?,?)",
        [codFilial, codSabor],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
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
        "delete from filial_sabordonur where codsabor = ?",
        id,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
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
            }
        }
    )
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
        "delete from compra where codcliente = ?",
        id,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
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
            }
        }
    )
});

app.post('/compra/create', (req, res) => {
    const codCliente = req.body.codCliente;
    const codFilial = req.body.codFilial;
    const codSabor = req.body.codSabor;
    const quantidade = req.body.quantidade;

    db.query(
        "select preco from sabordonut where sabordonut.id = ?",
        codSabor,
        (err, rows) => {
            if (err) {
                console.log(err);
            } else {
                const precototal = rows[0].preco * quantidade;
                insertCompra(codFilial, codCliente, precototal);
            }
        }
    );

    db.query(
        "update sabordonut set numvendas = numvendas + ? where sabordonut.id = ?",
        [quantidade, codSabor],
        (err, result) => {
            if (err) {
                console.log(err);
            }
        }
    )

    db.query(
        "update cliente set numcompras = numcompras + 1 where cliente.id = ?",
        codCliente,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
            }
        }
    );
});

function insertCompra(codFilial, codCliente, precototal) {
    db.query(
        "insert into compra (precototal, datacompra, codcliente) values (?,?,?)",
        [precototal, new Date(), codCliente],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                let codCompra = result.insertId;
                insertFilialCompra(codFilial, codCompra);
            }
        }
    );
}

function insertFilialCompra(codFilial, codCompra) {
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
        "delete from filial_compra where codcompra = ?",
        id,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
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
                )
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

app.get("/compra/listSaboresByFilial/:idFilial", (req, res) => {
    const idFilial = req.params.idFilial;
    db.query(
        "select fs.codsabor as value, s.nome as label from filial_sabordonut fs inner join sabordonut s on s.id = fs.codsabor where fs.codfilial = ?",
        idFilial,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    )
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

