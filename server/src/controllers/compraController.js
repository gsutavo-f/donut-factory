import db from '../config/dbConnection.js';

class CompraController {

   static getCompras(req, res) {
      db.query(
         "select * from compra",
         (err, result) => {
            if (err) {
               res.status(500).send({message: err.message});
            } else {
               res.status(200).send(result);
            }
         }
      );
   }

   static createCompra(req, res) {
      const {
         codCliente,
         codFilial,
         codSabor,
         quantidade
      } = req.body;

      db.query(
         "select preco from sabordonut where sabordonut.id = ?",
         codSabor,
         (err, rows) => {
            if (err) {
               res.status(500).send({message: err.message});
            } else {
               const precototal = rows[0].preco * quantidade;
               db.query(
                  "insert into compra (precototal, datacompra, codcliente) values (?,?,?)",
                  [precototal, new Date(), codCliente],
                  (err, result) => {
                     if (err) {
                        res.status(500).send({message: err.message});
                     } else {
                        let codCompra = result.insertId;
                        db.query(
                           "insert into filial_compra (codfilial, codcompra) values (?,?)",
                           [codFilial, codCompra],
                           (err) => {
                              if (err) {
                                 res.status(500).send({message: err.message});
                              }
                           }
                        );
                     }
                  }
               );
            }
         }
      );

      db.query(
         "update sabordonut set numvendas = numvendas + ? where sabordonut.id = ?",
         [quantidade, codSabor],
         (err) => {
            if (err) {
               res.status(500).send({message: err.message});
            }
         }
      )

      db.query(
         "update cliente set numcompras = numcompras + 1 where cliente.id = ?",
         codCliente,
         (err) => {
            if (err) {
               res.status(500).send({message: err.message});
            } else {
               res.status(200).send({message: "Values Inserted"});
            }
         }
      );
   }

   static deleteCompra(req, res) {
      const {id} = req.params;
      db.query(
         "delete from filial_compra where codcompra = ?",
         id,
         (err) => {
            if (err) {
               res.status(500).send({message: `${err.message} - Error deleting filial_compra`});
            } else {
               db.query(
                  "delete from compra where id = ?",
                  id,
                  (err) => {
                     if (err) {
                        res.status(500).send({message: `${err.message} - Error deleting compra`});
                     } else {
                        res.status(200).send({message: "Value Deleted"});
                     }
                  }
               );
            }
         }
      );
   }

}

export default CompraController;