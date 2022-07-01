import db from '../config/dbConnection.js';

class ClienteController {

   static getClientes(req, res) {
      db.query(
         "select * from cliente",
         (err, result) => {
            if (err) {
               res.status(500).send({message: err.message});
            } else {
               res.status(200).send(result);
            }
         }
      );
   }

   static getClientesForSelect(req, res) {
      db.query(
         "select id as value, nome as label from cliente",
         (err, result) => {
            if (err) {
               res.status(500).send({message: err.message});
            } else {
               res.status(200).send(result);
            }
         }
      );
   }

   static createCliente(req, res) {
      const {
         name,
         cpf,
         phone,
         address
      } = req.body;

      db.query(
         "insert into cliente (nome, cpf, telefone, endereco) values (?,?,?,?)",
         [name, cpf, phone, address],
         (err) => {
            if (err) {
               res.status(500).send({message: err.message});
            } else {
               res.status(200).send({message: "Values Inserted"});
            }
         }
      );
   }

   static updateCliente(req, res) {
      const {id} = req.params;
      const {phone} = req.body;
      db.query(
         "update cliente set telefone = ? where id = ?",
         [phone, id],
         (err) => {
            if (err) {
               res.status(400).send({message: `${err.message} - Cliente not found`});
            } else {
               res.status(200).send({message: "Value Updated"});
            }
         }
      );
   }

   static deleteCliente(req, res) {
      const {id} = req.params;
      db.query(
         "delete from compra where codcliente = ?",
         id,
         (err) => {
            if (err) {
               res.status(500).send({message: `${err.message} - Error deleting compras of cliente`});
            } else {
               db.query(
                  "delete from cliente where id = ?",
                  id,
                  (err) => {
                     if (err) {
                        res.status(500).send({message: `${err.message} - Error deleting cliente`});
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

export default ClienteController;